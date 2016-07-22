'use strict';

/**
 * This view model contains the root implementation of the wizard.
 * Each individual view inside the wizard must conform to the following
 * list of properties and methods in order to be presented by the wizard.
 *
 *  WizardStepViewModels
 *      - ready { must be callable and return true/false } Indicates
 *      whether or not the view model has the required data.
 *      - results { an array-like object of results } Should contain the
 *      relevant results in order to determine the next step.
 *
 * This view model uses the above properties to determine how/when to allow
 * the user to move through the process.
 *
 * To add steps: add an entry to the Fixtures.wizard.steps settings.
 *
 */
function WizardViewModel() {
    var self = this;

    /**
     * A key:value store of all possible steps by name.
     */
    self.steps = Fixtures.wizard.steps;

    self.previousSteps = ko.observableArray([]);

    self.currentStep = ko.observable(null);

    /**
     * A marker than the wizard is complete and that the
     * finish button should be visible.
     */
    self._isComplete = ko.observable(false);

    // View Model Methods

    self.init = function() { };

    self.load = function() { };

    self.unload = function() { };

    // Step Management Methods

    /**
     * If possible, progresses to the next step based on the results of the
     * current step, and initializes that step. The method also pushes the
     * previous step onto the list of previous steps.
     *
     * Side effect: If no next step exists, the _isComplete attribute
     * is set to true.
     *
     * Side effect: If a step should cause the wizard to terminate, then
     * the it is immediately done.
     */
    self.goForward = function() {
        var nextStepDescriptor = self._determineStepAfterStep(
            self.currentStep(), self.steps);

        if (nextStepDescriptor.terminate) {
            self.terminate();
            return;
        } else if (!nextStepDescriptor.viewModel) {
            self._isComplete(true);
            return;
        };

        self.previousSteps.push(self.currentStep());
        self.currentStep(nextStep);

        self._initializeStep(self.currentStep());
    };

    /**
     * If possible, reverts the steps by 1. This method allows the
     * current step to unload before loading the previous step.
     * **Warning** This method wil destroy any information saved
     * on the current step.
     */
    self.goBackward = function() {
        if (self.previousSteps().length === 0) { return; };

        self._deinitializeStep(self.currentStep());

        var previousStep = self.previousSteps.pop();
        self.currentStep(previousStep);

        self._initializeStep(self.currentStep());
    };

    /**
     * When called, immediately terminate the wizard and notify the
     * system of successful completion.
     */
    self.terminate = function() {
        // Newest character will be at the back.
        var character = Character.findAll().reverse()[0];
        if (character) {
            CharacterManager.changeCharacter(character.key());
        }
    };

    /**
     * Progress through all previous and current steps and save their data.
     */
    self.save = function() {
        var character = new Character();
        character.key(uuid.v4());
        character.save();

        //TODO: Save the results of all child steps.
    };

    // UI Helper Methods

    self.shouldShowNextButton = ko.pureComputed(function() {
        return self.currentStep().ready();
    });

    self.shouldShowPreviousButton = ko.pureComputed(function() {
        return self.previousSteps().length != 0;
    });

    self.shouldShowFinishButton = ko.pureComputed(function() {
        return self._isComplete();
    });

    // Button Methods

    self.nextButton = function() {
        self.goForward();
    };

    self.previousButton = function() {
        self.goBackward()
    };

    self.finishButton = function() {
        self.save();
        self.terminate();
    };

    // Private Methods

    self._initializeStep = function(step) {
        step.init();
        step.load();
    };

    self._deinitializeStep = function(step) {
        step.unload();
    };

    /**
     * Given a step, and all the possible future steps,
     * use it's results to determine the next step in the sequence.
     *
     * @returns {NextStepDescriptor} Returns a descriptor of what to do next.
     */
    self._determineStepAfterStep = function(currentStep, steps) {
        var nextStep = null;
        var results = currentStep().results();
        if (currentStep.identifier() === 'WizardIntroStep') {
            if (results().PlayerType === 'import') {
                nextStep = new NextStepDescriptor(null, true);
            } else if (results().PlayerType === 'player') {
                nextStep = new NextStepDescriptor(/*TODO*/);
            }
        }

        //TODO Add more steps here.

        return nextStep;
    };
}


/**
 * This model describes the next step to be taken and the various options
 * that are allowed.
 *
 * @param viewModel {object or null} an step view model to progress to if provided.
 * @param terminate {boolean} whether or not to terminate the wizard and return to
 * the main application.
 */
function NextStepDescriptor(viewModel, terminate) {
    this.viewModel = viewModel || null;
    this.terminate = terminate || false;
};

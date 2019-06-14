import {
    CoreManager,
    Notifications,
    Utility
} from 'charactersheet/utilities';
import { CardEditActionComponent } from 'charactersheet/components/card-edit-actions';
import { Clazz } from 'charactersheet/models';

import ko from 'knockout';

/**
 * AbstractViewModel
 *
 * Provides base functionality to view Data instances.
 *
 *
 *
 * @property containerId {string} The dom id for the container of this component.
 *
 * @param flip {function} function for displaying/hiding the view. Used to
 * 'flip' flip-cards, or expand/collapse rows
 *
 * @param show {observable} Whether or not this view is displayed.
 *
 * @param existingData {optional observable} Existing data (such as data from a parent).
 *
 *  Tracked items need to show the 'TrackedForm' to collect tracked data.
 **/

export class AbstractViewModel {
    constructor(params) {
        this.coreKey = CoreManager.activeCore().uuid();
        this.containerId = ko.utils.unwrapObservable(params.containerId);
        this.flip = params.flip;
        this.show = params.show ? params.show : ko.observable(true);
        this.existingData = params.data ? params.data : null;

        this.entity = ko.observable();
        this.loaded = ko.observable(false);
        this.subscriptions = [];
    }

    modelClass() {
        if (!this.modelName) {
            throw('Model Name or generateBlank must be implemented by Views');
        }
        return Clazz[this.modelName];
    }

    generateBlank() {
        if (!this.modelName) {
            throw('Model Name or generateBlank must be implemented by Views');
        }
        const newEntity = new Clazz[this.modelName];
        newEntity.coreUuid(this.coreKey);
        return newEntity;
    }

    async load() {
        this.entity(this.generateBlank());
        await this.refresh();
        this.setUpSubscriptions();
        this.loaded(true);
    }

    async refresh() {
        if (this.existingData) {
            this.entity().importValues(this.existingData.exportValues());
        } else {
            const response = await this.modelClass().ps.read({uuid: this.coreKey});
            this.entity().importValues(response.object.exportValues());
        }
    }

    setUpSubscriptions() {
        const showSubscription = this.show.subscribe(this.subscribeToVisible);
        this.subscriptions.push(showSubscription);
    }

    subscribeToVisible = async () => {
        if (this.show()) {
            await this.refresh();
        }
    }

    disposeOfSubscriptions() {
        this.subscriptions.forEach((subscription) => subscription.dispose());
        this.subscriptions = [];
    }

    dispose() {
        this.disposeOfSubscriptions();
    }

    shortText = (string) => {
        return Utility.string.truncateStringAtLength(
          ko.utils.unwrapObservable(string),
          25
        );
    };

    isNumeric = (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}

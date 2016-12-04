'use strict';

function MonsterAbilityScore() {
    var self = this;
    self.ps = PersistenceService.register(MonsterAbilityScore, self);
    self.mapping = {
        include: ['characterId', 'encounterId', 'name', 'value']
    }

    self.characterId = ko.observable(null);
    self.encounterId = ko.observable(null);
    self.name = ko.observable();
    self.value = ko.observable();

    self.modifier = ko.pureComputed(function() {
      if (isNumeric(self.value())){
          return Math.floor((self.value() - 10) / 2);
      } else {
          return null;
      }
    });

    self.clear = function() {
        var values = new MonsterAbilityScore().exportValues();
        var mapping = ko.mapping.autoignore(self, self.mapping);
        ko.mapping.fromJS(values, mapping, self);
    };

    self.importValues = function(values) {
        var mapping = ko.mapping.autoignore(self, self.mapping);
        ko.mapping.fromJS(values, mapping, self);
    };

    self.exportValues = function() {
        var mapping = ko.mapping.autoignore(self, self.mapping);
        return ko.mapping.toJS(self, mapping);
    };

    self.save = function() {
        self.ps.save();
    };

    self.delete = function() {
        self.ps.delete();
    };
};

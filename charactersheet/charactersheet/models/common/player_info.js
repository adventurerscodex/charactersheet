import ko from 'knockout'
import 'knockout-mapping'

import 'bin/knockout-mapping-autoignore'
import md5 from 'blueimp-md5'

import { PersistenceService } from 'charactersheet/services/common/persistence_service'
export function PlayerInfo() {
    var self = this;
    self.ps = PersistenceService.register(PlayerInfo, self);

    self.GRAVATAR_BASE_URL = 'https://www.gravatar.com/avatar/{}?d=mm';

    self.characterId = ko.observable(null);
    self.email = ko.observable('');

    self.gravatarUrl = function() {
        try {
            var hash = md5(self.email().trim());
            return self.GRAVATAR_BASE_URL.replace('{}', hash);
        } catch(err) {
            return '';
        }
    };

    self.clear = function() {
        self.email('');
    };

    self.save = function() {
        self.ps.save();
    };

    self.importValues = function(values) {
        self.characterId(values.characterId);
        self.email(values.email);
    };

    self.exportValues = function() {
        return {
            characterId: self.characterId(),
            email: self.email()
        };
    };
}


PersistenceService.addToRegistry(PlayerInfo);

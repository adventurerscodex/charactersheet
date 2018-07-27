import { KOModel } from 'hypnos/lib/models/ko';
import { Utility } from 'charactersheet/utilities/convenience';
import ko from 'knockout';


export class PointOfInterest extends KOModel {
    static __skeys__ = ['core', 'pointsOfInterest'];

    SHORT_DESCRIPTION_MAX_LENGTH = 100;
    LONG_DESCRIPTION_MAX_LENGTH = 200;

    static mapping = {
        include: ['coreUuid', 'encounterUuid', 'name', 'description']
    };

    coreUuid = ko.observable();
    encounterUuid = ko.observable();
    uuid = ko.observable();
    name = ko.observable();
    description = ko.observable();

    // UI Methods

    longDescription = ko.pureComputed(function() {
        return Utility.string.truncateStringAtLength(this.description(), this.LONG_DESCRIPTION_MAX_LENGTH);
    });

    shortDescription = ko.pureComputed(function() {
        return Utility.string.truncateStringAtLength(this.description(), this.SHORT_DESCRIPTION_MAX_LENGTH);
    });
}
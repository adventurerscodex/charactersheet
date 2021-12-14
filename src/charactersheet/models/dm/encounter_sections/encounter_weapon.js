import { Fixtures } from 'charactersheet/utilities';
import { KOModel } from 'hypnos/lib/models/ko';
import { Utility } from 'charactersheet/utilities/convenience';
import ko from 'knockout';


export class EncounterWeapon extends KOModel {

    static __skeys__ = ['core', 'encounters', 'treasures'];

    SHORT_DESCRIPTION_MAX_LENGTH = 100;

    static mapping = {
        include: ['coreUuid', 'encounterUuid', 'type', 'uuid']
    };

    static weaponFields = [
        'name',
        'type',
        'damage',
        'damageType',
        'handedness',
        'proficiency',
        'price',
        'currencyDenomination',
        'magicalModifier',
        'toHitModifier',
        'weight',
        'range',
        'property',
        'description',
        'quantity',
        'hitBonusLabel'
    ];

    uuid = ko.observable();
    coreUuid = ko.observable();
    encounterUuid = ko.observable();
    type = ko.observable();

    // Weapon Fields

    name = ko.observable('');
    type = ko.observable('');
    damage = ko.observable('');
    damageType = ko.observable('');
    handedness = ko.observable('');
    proficiency = ko.observable('');
    price = ko.observable(0);
    currencyDenomination = ko.observable('');
    magicalModifier = ko.observable(0);
    toHitModifier = ko.observable(0);
    weight = ko.observable(1);
    range = ko.observable('');
    property = ko.observable('');
    description = ko.observable('');
    quantity = ko.observable(1);
    hitBonusLabel = ko.observable();

    proficiencyOptions = ko.observableArray(Fixtures.weapon.weaponProficiencyOptions);
    handednessOptions = ko.observableArray(Fixtures.weapon.weaponHandednessOptions);
    typeOptions = ko.observableArray(Fixtures.weapon.weaponTypeOptions);
    propertyOptions = ko.observableArray(Fixtures.weapon.weaponPropertyOptions);
    damageTypeOptions = ko.observableArray(Fixtures.weapon.weaponDamageTypeOptions);
    currencyDenominationOptions = Fixtures.general.currencyDenominationList;

    propertyLabel = ko.pureComputed(() => {
        return this.damage() ? this.damage() : '';
    });

    shortDescription = ko.pureComputed(() => {
        return Utility.string.truncateStringAtLength(this.description(), this.SHORT_DESCRIPTION_MAX_LENGTH);
    });

    rangeLabel = ko.pureComputed(() => {
        if (this.type().toLowerCase() === 'ranged') {
            if (this.range()) {
                return this.range() + ' ft.';
            } else {
                return '';
            }
        } else if (this.type().toLowerCase() === 'melee') {
            var weaponRange = parseInt(this.range());
            if (!weaponRange) {
                weaponRange = 5;
            }
            if (this.property()) {
                if (this.property().toLowerCase().indexOf('reach') !== -1) {
                    weaponRange += 5;
                }
            }
            return weaponRange + ' ft.';
        }
    });

    magicalModifierLabel = ko.pureComputed(() => {
        var magicalModifier = this.magicalModifier();
        if (magicalModifier) {
            return magicalModifier >= 0 ? ('+ ' + magicalModifier) : '- ' +
            Math.abs(magicalModifier);
        } else {
            return '';
        }
    });

    descriptionHTML = ko.pureComputed(() => {
        if (!this.description()) {
            return '<div class="h3"><small>Add a description via the edit tab.</small></div>';
        }

        return this.description();
    });

    weightLabel = ko.pureComputed(() => {
        return this.weight() !== '' && this.weight() >= 0 ? this.weight() + ' lbs.' : '0 lbs.';
    });

    clean = (keys, params) => {
        let treasure = pick(params, EncounterWeapon.mapping.include);
        treasure.value = pick(params, EncounterWeapon.weaponFields);
        return treasure;
    };
}

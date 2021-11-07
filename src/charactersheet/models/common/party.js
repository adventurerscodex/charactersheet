import { KOModel } from 'hypnos';
import {
    observable,
    observableArray
} from 'knockout';


export class Party extends KOModel {

    static __skeys__ = ['core', 'party'];

    static mapping = {
        include: ['coreUuid'],
    };

    coreUuid = observable(null);
    shortCode = observable('');
    createdAt = observable('');
    updatedAt = observable('');
    exhibit = observable('');
    members = observableArray([]);

    static async join(coreUuid, shortCode) {
        return await Party.ps.client.action({
            keys: [...Party.__skeys__, 'join', 'create'],
            params: { uuid: coreUuid, shortCode }
        });
    }

    static async leave(coreUuid) {
        return await Party.ps.client.action({
            keys: [...Party.__skeys__, 'join', 'leave'],
            params: { uuid: coreUuid }
        });
    }
}

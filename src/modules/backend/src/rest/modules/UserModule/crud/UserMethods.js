import User from '../../../../database/models/User';
import {handleMongoError} from '../../../../database/mongoError';
import {CRUDMethods} from '../../../CRUDMethods';

export class UserMethods extends CRUDMethods {
    constructor() {
        super();

        // User create method
        this.create = {
            request: 'create',
            handle: this.createMethod,
            middleware: [],
            optionalParameters: [],
            requiredParameters: [
                {name: 'username', type: 1}, // TODO: Make "STRING" when fixed in paper-wrapper
                {name: 'email', type: 1}, // TODO: Make "STRING" when fixed in paper-wrapper
                {name: 'password', type: 1}, // TODO: Make "STRING" when fixed in paper-wrapper
            ]
        }

    }

    createMethod(request) {
        const user = new User({
            username: request.parameters.username,
            email: request.parameters.email
        });
        user.setPassword(request.parameters.password);

        // Insert a new user into the collection
        user.save((err) => {
            if (err) {
                return request.error(
                    handleMongoError(err, {
                        duplicateKey: 'USER_EXISTS'
                    })
                );
            }
            return request.respond(null);
        });
    }

    readMethod(request) {
        throw new Error('Read not implemented.');
    }

    updateMethod(request) {
        throw new Error('Update not implemented.');
    }

    deleteMethod(request) {
        throw new Error('Delete not implemented.');
    }
}
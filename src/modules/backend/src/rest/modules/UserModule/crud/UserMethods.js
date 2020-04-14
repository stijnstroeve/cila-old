import User from '../../../../database/models/User';
import {handleMongoError} from '../../../../database/mongoError';
import {CRUDMethods} from '../../../CRUDMethods';
import winstonLogger from '../../../../logger/winston';
import {handleFileError} from '../../../../files/fileError';
import ResultError from '../../../error';

export class UserMethods extends CRUDMethods {
    constructor() {
        super();

        const requestName = 'users';

        // User create method
        this.create = {
            request: requestName,
            handle: this.createMethod,
            middleware: [],
            optionalParameters: [],
            requiredParameters: [
                {name: 'username', type: 1}, // TODO: Make "STRING" when fixed in paper-wrapper
                {name: 'email', type: 1}, // TODO: Make "STRING" when fixed in paper-wrapper
                {name: 'password', type: 1}, // TODO: Make "STRING" when fixed in paper-wrapper
            ]
        };

        // User create method
        this.delete = {
            request: requestName,
            handle: this.deleteMethod,
            middleware: [],
            optionalParameters: [],
            requiredParameters: [
                {name: 'id', type: 1}, // TODO: Make "STRING" when fixed in paper-wrapper
            ]
        }
    }

    /**
     * Creates a user in the database
     * @param request
     */
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
        const {id} = request.parameters;
        User.findOne({_id: id}).then(async (user) => {
            if(!user) return request.error(
                ResultError('DOCUMENT_NOT_FOUND', null, {
                    variables: [
                        {name: 'FIELD', variable: 'id'},
                        {name: 'VALUE', variable: id}
                    ]
                })
            );

            // Disable the account
            user.disabled = true;

            // Save the updated model
            await user.save();

            request.respond(null);
        }).catch((err) => {
            // TODO: Create global error handler?????
            request.error(
                handleMongoError(err)
            );
        });
    }
}
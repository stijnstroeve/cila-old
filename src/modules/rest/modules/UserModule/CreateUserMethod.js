import {ModuleMethod, RequestType} from 'paper-wrapper';
import User from '../../../database/models/User';
import ResultError from '../../error';
import {getMongoError} from '../../../database/mongoError';
import {MONGODB_DUPLICATION_KEY} from '../../../database/constants';

export class CreateUserMethod extends ModuleMethod {
    constructor() {
        super();

        this.optionalParameters = [];
        this.request = 'create';
        this.requestType = RequestType.POST;
        this.requiredParameters = [
            {name: 'username', type: 1}, // TODO: Make "STRING" when fixed in paper-wrapper
            {name: 'email', type: 1}, // TODO: Make "STRING" when fixed in paper-wrapper
            {name: 'password', type: 1}, // TODO: Make "STRING" when fixed in paper-wrapper
        ];
        this.middleware = [];
    }

    /**
     * Handles the given mongodb error
     * @param err
     * @returns {Error}
     */
    handleError(err) {
        const errorType = getMongoError(err);
        if(errorType === MONGODB_DUPLICATION_KEY) {
            return ResultError('USER_EXISTS', err)
        } else {
            return ResultError('UNKNOWN', err)
        }
    }

    handle(request) {
        const user = new User({
            username: request.parameters.username,
            email: request.parameters.email
        });
        user.setPassword(request.parameters.password);

        // Insert a new user into the collection
        User.collection.insertOne(user, (err) => {
            if (err) {
                return request.error(
                    this.handleError(err)
                );
            }
            return request.respond(null);
        });
    }

}
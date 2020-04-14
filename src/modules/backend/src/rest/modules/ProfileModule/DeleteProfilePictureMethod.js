import {ModuleMethod, RequestType} from 'paper-wrapper';
import {AuthorizationMiddleware} from '../../middleware/AuthorizationMiddleware';
import {handleFileError} from '../../../files/fileError';
import {handleMongoError} from '../../../database/mongoError';

export class DeleteProfilePictureMethod extends ModuleMethod {
    constructor() {
        super();

        this.optionalParameters = [];
        this.request = 'delete-profile-picture';
        this.requestType = RequestType.DELETE;
        this.requiredParameters = [];
        this.middleware = [new AuthorizationMiddleware()];
    }

    handle(request) {
        const {user} = request.request;

        // Set the profile picture to null, so it will be deleted
        user.setProfilePicture(null).then(async () => {
            await user.save();

            request.respond(null);
        }).catch((err) => {
            request.error(
                handleMongoError(err)
            );
        });
    }

}
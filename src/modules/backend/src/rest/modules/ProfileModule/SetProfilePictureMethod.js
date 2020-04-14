import {ModuleMethod, RequestType} from 'paper-wrapper';
import {AuthorizationMiddleware} from '../../middleware/AuthorizationMiddleware';
import {handleFileError} from '../../../files/fileError';

export class SetProfilePictureMethod extends ModuleMethod {
    constructor() {
        super();

        this.optionalParameters = [];
        this.request = 'set-profile-picture';
        this.requestType = RequestType.POST;
        this.requiredParameters = [
            {name: 'fileId', type: 1}, // TODO: Make "STRING" when fixed in paper-wrapper
        ];
        this.middleware = [new AuthorizationMiddleware()];
    }

    handle(request) {
        const {user} = request.request;
        const {fileId} = request.parameters;

        user.setProfilePicture(fileId).then(async () => {
            await user.save();

            request.respond(user.profile.toJSON());
        }).catch((err) => {
            // TODO: Create global error handler????? Maybe handy because this needs handleFileError and handleMongoError
            request.error(
                handleFileError(err)
            );
        });
    }

}
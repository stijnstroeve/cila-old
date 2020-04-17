import {DataType, IParameter, Middleware, ModuleMethod, ModuleRequest, RequestType} from 'paper-wrapper';
import {AuthorizationMiddleware} from '../../middleware/AuthorizationMiddleware';
import {handleFileError} from '../../../files/fileError';
import {handleMongoError} from '../../../database/mongoError';
import {MongoError} from 'mongodb';

class DeleteProfilePictureMethod implements ModuleMethod {

    public request: string = 'delete-profile-picture';
    public requestType: RequestType = RequestType.DELETE;
    public optionalParameters: IParameter[] = [];
    public requiredParameters: IParameter[] = [];
    public middleware: Middleware[] = [new AuthorizationMiddleware()];

    handle(request: ModuleRequest) {
        const {user} = request.request;

        // Set the profile picture to null, so it will be deleted
        user.setProfilePicture(null).then(async () => {
            await user.save();

            request.respond(null);
        }).catch((err: MongoError) => {
            request.error(
                handleMongoError(err)
            );
        });
    }

}

export {DeleteProfilePictureMethod};
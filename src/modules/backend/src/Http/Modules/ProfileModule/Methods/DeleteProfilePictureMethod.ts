import {DataType, IParameter, Middleware, ModuleMethod, ModuleRequest, RequestType} from 'paper-wrapper';
import {AuthorizationMiddleware} from '../../../Middleware/AuthorizationMiddleware';
import {handleFileError} from '../../../../File/FileError';
import {handleMongoError} from '../../../../Database/MongoError';
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
import {IParameter, Middleware, ModuleMethod, ModuleRequest, DataType, RequestType} from 'paper-wrapper';
import {AuthorizationMiddleware} from '../../../Middleware/AuthorizationMiddleware';
import {handleFileError} from '../../../../File/FileError';

class SetProfilePictureMethod implements ModuleMethod {

    public request: string = 'set-profile-picture';
    public requestType: RequestType = RequestType.POST;
    public optionalParameters: IParameter[] = [];
    public requiredParameters: IParameter[] = [
        {name: 'fileId', type: DataType.STRING}
    ];
    public middleware: Middleware[] = [new AuthorizationMiddleware()];

    handle(request: ModuleRequest) {
        const {user} = request.request;
        const {fileId} = request.parameters;

        user.setProfilePicture(fileId).then(async () => {
            await user.save();

            request.respond(user.profile.toJSON());
        }).catch((err: Error) => {
            // TODO: Create global Error handler????? Maybe handy because this needs handleFileError and handleMongoError
            request.error(
                handleFileError(err)
            );
        });
    }
}

export {SetProfilePictureMethod};

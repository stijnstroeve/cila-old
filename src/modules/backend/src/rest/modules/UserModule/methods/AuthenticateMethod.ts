import {DataType, IParameter, Middleware, ModuleMethod, ModuleRequest, RequestType} from 'paper-wrapper';
import {AuthenticationMiddleware} from '../../../middleware/AuthenticationMiddleware';

class AuthenticateMethod implements ModuleMethod {

    public request: string = 'authenticate';
    public requestType: RequestType = RequestType.POST;
    public optionalParameters: IParameter[] = [];
    public requiredParameters: IParameter[] = [
        {name: 'email', type: DataType.STRING}, // TODO: Make "STRING" when fixed in paper-wrapper
        {name: 'password', type: DataType.STRING}, // TODO: Make "STRING" when fixed in paper-wrapper
    ];
    public middleware: Middleware[] = [new AuthenticationMiddleware()];

    handle(request: ModuleRequest) {
        // Success response with body containing authorization info
        request.respond(request.request.user.toAuthJSON());
    }

}

export {AuthenticateMethod};
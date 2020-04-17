import {IParameter, Middleware, ModuleMethod, ModuleRequest, RequestType} from 'paper-wrapper';
import {AuthorizationMiddleware} from '../../../middleware/AuthorizationMiddleware';

class AuthorizeMethod implements ModuleMethod {

    public request: string = 'authorize';
    public requestType: RequestType = RequestType.POST;
    public optionalParameters: IParameter[] = [];
    public requiredParameters: IParameter[] = [];
    public middleware: Middleware[] = [new AuthorizationMiddleware()];

    handle(request: ModuleRequest) {
        // Success response with empty body
        request.respond(null);
    }

}

export {AuthorizeMethod};
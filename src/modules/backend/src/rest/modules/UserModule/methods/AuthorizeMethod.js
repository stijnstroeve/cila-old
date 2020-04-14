import {ModuleMethod, RequestType} from 'paper-wrapper';
import {AuthorizationMiddleware} from '../../../middleware/AuthorizationMiddleware';

export class AuthorizeMethod extends ModuleMethod {
    constructor() {
        super();

        this.optionalParameters = [];
        this.request = 'authorize';
        this.requestType = RequestType.POST;
        this.requiredParameters = [];

        this.middleware = [new AuthorizationMiddleware()];
    }

    handle(request) {
        // Successful response with empty body
        request.respond(null);
    }

}
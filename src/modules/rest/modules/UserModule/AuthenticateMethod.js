import {ModuleMethod, RequestType} from 'paper-wrapper';
import {AuthenticationMiddleware} from '../../middleware/AuthenticationMiddleware';

export class AuthenticateMethod extends ModuleMethod {
    constructor() {
        super();

        this.optionalParameters = [];
        this.request = 'authenticate';
        this.requestType = RequestType.POST;
        this.requiredParameters = [
            {name: 'email', type: 1}, // TODO: Make "STRING" when fixed in paper-wrapper
            {name: 'password', type: 1}, // TODO: Make "STRING" when fixed in paper-wrapper
        ];
        this.middleware = [new AuthenticationMiddleware()];
    }

    handle(request) {
        // Successful response with empty body
        request.respond(request.request.user.toAuthJSON());
    }

}
import {ModuleMethod, RequestType} from 'paper-wrapper';

export class AuthorizeMethod extends ModuleMethod {
    constructor() {
        super();

        this.optionalParameters = [];
        this.request = 'authorize';
        this.requestType = RequestType.GET;
        this.requiredParameters = [];
    }

    handle(request) {
        request.respond({hello: 'world'});
    }

}
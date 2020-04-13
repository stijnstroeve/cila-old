import {ModuleMethod, RequestType} from 'paper-wrapper';
import {AuthorizationMiddleware} from '../../middleware/AuthorizationMiddleware';
import {FileMiddleware} from '../../middleware/FileMiddleware';

export class UploadFileMethod extends ModuleMethod {
    constructor() {
        super();

        this.optionalParameters = [];
        this.request = 'upload-file';
        this.requestType = RequestType.POST;
        this.requiredParameters = [
            // {name: 'email', type: 1}, // TODO: Make "STRING" when fixed in paper-wrapper
            // {name: 'password', type: 1}, // TODO: Make "STRING" when fixed in paper-wrapper
        ];
        this.middleware = [new AuthorizationMiddleware(), new FileMiddleware()];
    }

    handle(request) {
        // Successful response with empty body
        request.respond(request.request.file);
    }

}
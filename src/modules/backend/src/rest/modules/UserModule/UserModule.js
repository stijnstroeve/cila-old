import {Module} from 'paper-wrapper';
import {AuthorizeMethod} from './methods/AuthorizeMethod';
import {AuthenticateMethod} from './methods/AuthenticateMethod';
import {UserMethods} from './crud/UserMethods';

export default class UserModule extends Module {
    constructor() {
        super();

        this.moduleMethods = [
            new AuthorizeMethod(),
            new AuthenticateMethod(),

            // User CRUD
            ...new UserMethods().getMethods()
        ];
        this.name = 'user';
    }
}
import {Module} from 'paper-wrapper';
import {AuthorizeMethod} from './AuthorizeMethod';
import {AuthenticateMethod} from './AuthenticateMethod';
import {CreateUserMethod} from './CreateUserMethod';

export default class UserModule extends Module {
    constructor() {
        super();

        this.moduleMethods = [
            new AuthorizeMethod(),
            new AuthenticateMethod(),
            new CreateUserMethod()
        ];
        this.name = 'user';
    }
}
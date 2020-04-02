import {Module} from 'paper-wrapper';
import {AuthorizeMethod} from './AuthorizeMethod';

export default class UserModule extends Module {
    constructor() {
        super();

        this.moduleMethods = [new AuthorizeMethod()];
        this.name = 'user';
    }
}
import {Module, ModuleMethod} from 'paper-wrapper';
import {AuthorizeMethod} from './methods/AuthorizeMethod';
import {AuthenticateMethod} from './methods/AuthenticateMethod';
import {UserMethods} from './crud/UserMethods';

class UserModule implements Module {

    public name: string = 'user';
    public moduleMethods: ModuleMethod[] = [
        new AuthorizeMethod(),
        new AuthenticateMethod(),

        // User CRUD
        ...new UserMethods().getMethods()
    ];
}

export default UserModule;
import {Module, ModuleMethod} from 'paper-wrapper';
import {AuthorizeMethod} from './Methods/AuthorizeMethod';
import {AuthenticateMethod} from './Methods/AuthenticateMethod';
import {UserMethods} from './CRUD/UserMethods';

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
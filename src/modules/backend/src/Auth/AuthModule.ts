import AbstractModule from '../Core/Modules/AbstractModule';
import Passport from './Passport';

class AuthModule extends AbstractModule {

    public name: string = 'AuthModule';
    public registerOnTest: boolean = true;

    public register() {
        // Register passport strategies
        Passport.register();
    }

}

export default AuthModule;
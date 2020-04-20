import AbstractModule from '../Core/Modules/AbstractModule';

class LoggingModule extends AbstractModule {
    public name: string = 'LoggingModule';
    public registerOnTest: boolean = true;

    public register() {
        // TODO: Implement
    }

}

export default LoggingModule;
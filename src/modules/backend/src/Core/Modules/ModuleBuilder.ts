import AbstractModule from './AbstractModule';
import Configuration from '../Configuration';

// TODO: Rename builder to something more fitting
class ModuleBuilder {
    private modules: Array<AbstractModule>;

    constructor(modules: Array<AbstractModule>) {
        this.modules = modules;
    }

    public registerModules() {
        this.modules.forEach((module: AbstractModule) => {
            // TODO: Improve OR Gate
            if(Configuration.getInstance().isTest()) {
                if(module.registerOnTest) {
                    module.register();
                }
            } else {
                module.register();
            }
        })
    }

}

export default ModuleBuilder;
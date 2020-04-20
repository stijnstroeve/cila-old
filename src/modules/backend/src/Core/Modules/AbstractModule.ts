
abstract class AbstractModule {

    abstract name: string;
    abstract registerOnTest: boolean;

    /**
     * Register all parts of the module
     * @returns {any}
     */
    abstract register(): any;

}

export default AbstractModule;
import AbstractModule from '../Core/Modules/AbstractModule';
import RestAPI from './RestAPI';
import Configuration from '../Core/Configuration';

class HttpModule extends AbstractModule {
    public name: string = 'RestModule';
    public registerOnTest: boolean = false;
    public restAPI: RestAPI;

    public register() {
        const config = Configuration.getInstance();

        // Initialize the rest API
        this.restAPI = new RestAPI(
            config.getSimpleEnvironment()
        );
        this.restAPI.listen(config.values.rest_api_port);
    }

}

export default HttpModule;
import axios from 'axios';
import config from '../../config';

export default class BackendService {
    static _parseModules(modules) {
        // If modules is not defined, return an empty string
        if(modules === undefined) return '';

        let moduleString = '';
        modules.forEach((module, i) => moduleString += (module + (i !== modules.length - 1 ? '/' : '')));
        return moduleString;
    }

    static _parseUrl(modules, request) {
        const moduleString = BackendService._parseModules(modules);
        const path = '/' + moduleString + '/' + request;
        return config.server_host + path;
    }

    /**
     * Sends a request to the backend given in the configuration
     * @param restMethod The request method(GET, POST, etc...)
     * @param modules The module(s) of the request
     * @param request The request name
     * @param params The parameters that should be send with the request
     */
    static sendRequest(restMethod, modules, request, params) {
        // Check if the modules contains of 1 module or multiple
        if(!Array.isArray(modules)) {
            modules = [modules];
        }

        // Get the parsed url
        const url = BackendService._parseUrl(modules, request);

        return axios({
            method: restMethod,
            url: url,
            data: params || undefined
        });
    }
}
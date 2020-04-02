import express from 'express';
import CilaLogger from '../logger/cilaLogger';

export default class RestAPI {
    constructor() {
        this.app = express();
    }

    /**
     * Starts the rest api server on the given port
     * @param port The port to listen on
     */
    listen(port) {
        this.port = port;

        this.app.listen(this.port, () => {
            CilaLogger.log('Started REST api on port ' + this.port);
        });
    }
}
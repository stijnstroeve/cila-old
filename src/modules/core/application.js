import System from './models/system';
import ConfigReader from './configurations/configReader';
import DatabaseConnector from '../database/databaseConnector';
import CilaLogger from '../logger/cilaLogger';
import RestAPI from '../rest';

const ApplicationState = Object.freeze({
    STARTING: 'starting',
    RUNNING: 'running',
    STOPPED: 'stopped'
});

export default class Application {
    constructor() {
        this.state = ApplicationState.STOPPED;
    }

    /**
     * Starts the application
     */
    start() {
        CilaLogger.log('Starting...');

        this.state = ApplicationState.STARTING;
        this.config = ConfigReader.read();
        this.system = new System();

        // Try to connect to the database
        DatabaseConnector.connect(this.config).then((database) => {
            this.database = database;

            // When successfully connected to the database, start the application interval timer and initialize the rest api
            this._startInterval();
            this._initializeRestAPI();

        }).catch(() => {
            // When no connection to the database could be made, exit the application
            // process.exit(1);
        });

    }

    /**
     * Stops the application
     */
    stop() {
        CilaLogger.log('Stopping...');

        this.state = ApplicationState.STOPPED;

        // Stop the application by clearing the interval
        if (this.interval !== undefined) {
            clearInterval(this.interval);
        }
        process.exit(0);
    }

    _initializeRestAPI() {
        this.restAPI = new RestAPI(this.config.environment);
        this.restAPI.listen(this.config.rest_api_port);
    }

    _startInterval() {
        this.interval = setInterval(() => this._tick(), this.config.tick_delay * 1000);
    }

    _tick() {
        if (this.system !== undefined) {
            this.system.updateUptime();

            CilaLogger.log('New Uptime: ' + this.system.uptime);
        }
    }
}
import System from './models/System';
import DatabaseConnector from '../database/DatabaseConnector';
import CilaLogger from '../logger/CilaLogger';
import RestAPI from '../rest';
import config from './configurations/config.json';
import {SYSTEM_ROOM} from '../sockets/constants';
import {initializeFileUpload} from '../files';
import {Mongoose} from 'mongoose';

enum ApplicationState {
    STARTING = 'starting',
    RUNNING = 'running',
    STOPPED = 'stopped'
}

class Application {
    public state: ApplicationState;
    private system: System;
    private database: Mongoose;
    private interval: number;
    private restAPI: RestAPI;

    constructor() {
        this.state = ApplicationState.STOPPED;
    }

    /**
     * Starts the application
     */
    public start() {
        CilaLogger.log('Starting...');

        this.state = ApplicationState.STARTING;
        this.system = new System();

        // Try to connect to the database
        DatabaseConnector.connect().then((database: Mongoose) => {
            this.database = database;

            // When successfully connected to the database, start the application interval timer and initialize all modules
            this.initializeModules();

            this.startInterval();

            this.state = ApplicationState.RUNNING;
        }).catch(() => {
            // When no connection to the database could be made, exit the application
            process.exit(1);
        });

    }

    /**
     * Stops the application
     */
    public stop() {
        CilaLogger.log('Stopping...');

        this.state = ApplicationState.STOPPED;

        // Stop the application by clearing the interval
        if (this.interval !== undefined) {
            clearInterval(this.interval);
        }
        process.exit(0);
    }

    private getEnvironment(): "development" | "production" {
        const {environment} = config;

        if(environment !== 'production' && environment !== 'development') {
            throw new Error('Environment must be production or development.');
        }
        return environment;
    }

    private initializeModules() {
        // File upload module
        initializeFileUpload();

        // Rest API module
        this.restAPI = new RestAPI(this.getEnvironment());
        this.restAPI.listen(config.rest_api_port);
    }

    private startInterval() {
        // @ts-ignore
        this.interval = setInterval(() => this.tick(), config.tick_delay * 1000);
    }

    // TODO: Move this to its own module
    private tick() {
        if (this.system !== undefined) {
            this.system.update();

            this.restAPI.socketHandler.sendData(SYSTEM_ROOM, this.system);
        }
    }

}

export default Application;
export {ApplicationState};
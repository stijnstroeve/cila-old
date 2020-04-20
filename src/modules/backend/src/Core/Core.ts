import System from './Models/System';
import CilaLogger from '../Logging/CilaLogger';
import RestAPI from '../Http/RestAPI';
import {Mongoose} from 'mongoose';
import Configuration from './Configuration';
import ApplicationState from './ApplicationState';
import ModuleBuilder from './Modules/ModuleBuilder';
import AuthModule from '../Auth/AuthModule';
import FileModule from '../File/FileModule';
import AbstractModule from './Modules/AbstractModule';
import LoggingModule from '../Logging/LoggingModule';
import DatabaseModule from '../Database/DatabaseModule';
import HttpModule from '../Http/HttpModule';
import SocketModule from '../Sockets/SocketModule';

class Core {
    public state: ApplicationState;
    private system: System;
    private database: Mongoose;
    private interval: number;
    private restAPI: RestAPI;
    private moduleBuilder: ModuleBuilder;
    private modules: Array<AbstractModule>;
    private configPath: string;

    constructor(configPath?: string) {
        this.state = ApplicationState.STOPPED;
        this.configPath = configPath || './configurations/config.json';
    }

    /**
     * Starts the application
     */
    public start() {
        CilaLogger.log('Starting...');

        this.state = ApplicationState.STARTING;
        this.system = new System();

        return Core.loadConfiguration(this.configPath).then(() => {
            this.loadModules();
            this.startInterval();

            this.state = ApplicationState.RUNNING;
        });




        // Try to connect to the database
        // DatabaseConnector.connect().then((database: Mongoose) => {
        //     this.database = database;
        //
        //     // When successfully connected to the Database, start the application interval timer and initialize all Modules
        //     this.initializeModules();
        //
        //
        //     this.state = ApplicationState.RUNNING;
        // }).catch(() => {
        //     // When no connection to the Database could be made, exit the application
        //     process.exit(1);
        // });

    }

    /**
     * Loads the local configuration
     */
    public static loadConfiguration(path: string): Promise<any> {
        // TODO: Remove path hardcode
        return Configuration.getInstance().setupConfiguration(path);
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

    private startInterval() {
        // @ts-ignore
        this.interval = setInterval(() => this.tick(), Configuration.getInstance().values.tick_delay * 1000);
    }

    // TODO: Move this to its own module
    private tick() {
        // if (this.system !== undefined) {
        //     this.system.update();
        //
        //     this.restAPI.socketHandler.sendData(SYSTEM_ROOM, this.system);
        // }
    }

    /**
     * Register all application Modules
     */
    private loadModules() {
        this.modules = [
            new DatabaseModule(),
            new AuthModule(),
            new FileModule(),
            new LoggingModule(),
            new HttpModule(),
            new SocketModule()
        ];

        // TODO: Make modules register sequentially with promises
        this.moduleBuilder = new ModuleBuilder(this.modules);
        this.moduleBuilder.registerModules();
    }

}

export default Core;

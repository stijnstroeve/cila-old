import express from 'express';
import passport from '../Auth/Passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import {Paper} from 'paper-wrapper';
import socket from 'socket.io';
import CilaLogger from '../Logging/CilaLogger';
import UserModule from './Modules/UserModule/UserModule';
import SocketHandler from '../Sockets/SocketHandler';
import FileModule from './Modules/FileModule/FileModule';
import GlobalFileModule  from '../File/FileModule';
import ProfileModule from './Modules/ProfileModule/ProfileModule';
import Passport from '../Auth/Passport';

class RestAPI {
    public app: express.Application;
    public socketHandler: SocketHandler;
    private port: number;
    private paper: Paper;

    constructor(environment: 'development' | 'production') {
        this.app = express();

        // Initialize the configuration for paper-wrapper
        this.initializePaper(environment);

        this.registerMiddleware();
    }

    /**
     * Starts the Http api server on the given port
     * @param port The port to listen on
     * @param callback
     */
    public listen(port: number, callback?: Function): void {
        this.port = port;

        const server = this.app.listen(this.port, () => {
            CilaLogger.log('Started REST API on port ' + this.port);

            // Execute the callback
            if(callback) callback();
        });

        // Create the socket handler instance
        this.socketHandler = new SocketHandler(socket(server));
    }

    /**
     * Register middleware in express
     */
    private registerMiddleware(): void {

        // Static file upload path
        this.app.use('/' + GlobalFileModule.FILE_UPLOAD_PATH_PREFIX, express.static(GlobalFileModule.FILE_UPLOAD_PATH_PREFIX));

        // Initialize passport
        this.app.use(Passport.passport.initialize());

        // Initialize request body
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        // Initialize CORS
        this.app.use(cors());

        // Paper Middleware
        const paperRouter = this.paper.getRoutes();
        this.app.use(paperRouter);
    }

    /**
     * Initialize the paper modules
     * @param {"development" | "production"} environment
     */
    private initializePaper(environment: 'development' | 'production'): void {

        // Create a new paper wrapper instance with the given config
        const paper = new Paper({
            environment: environment,
            suppressMessages: true,
            suppressWarnings: false
        });

        // Register the paper Modules
        paper.addModules([
            new UserModule(),
            new ProfileModule(),
            new FileModule()
        ]);

        this.paper = paper;
    }
}

export default RestAPI;
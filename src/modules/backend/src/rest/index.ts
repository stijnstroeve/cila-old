import express from 'express';
import passport from '../auth/passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import {Paper} from 'paper-wrapper';
import socket from 'socket.io';
import CilaLogger from '../logger/CilaLogger';
import UserModule from './modules/UserModule/UserModule';
import SocketHandler from '../sockets/SocketHandler';
import FileModule from './modules/FileModule/FileModule';
import {FILE_UPLOAD_PATH_PREFIX} from '../files/constants';
import ProfileModule from './modules/ProfileModule/ProfileModule';

class RestAPI {
    private app: express.Application;
    private port: number;
    public socketHandler: SocketHandler;

    constructor(environment: "development" | "production") {
        this.app = express();

        // Initialize the configuration for paper-wrapper
        this.initializePaper(environment);
    }

    /**
     * Starts the rest api server on the given port
     * @param port The port to listen on
     */
    listen(port: number) {
        this.port = port;

        const server = this.app.listen(this.port, () => {
            CilaLogger.log('Started REST API on port ' + this.port);
        });

        // Create the socket handler instance
        this.socketHandler = new SocketHandler(socket(server));
    }

    private setupMiddleware(paper: Paper) {
        // Middleware

        // Static file upload path
        this.app.use('/' + FILE_UPLOAD_PATH_PREFIX, express.static(FILE_UPLOAD_PATH_PREFIX));

        // Initialize passport
        this.app.use(passport.initialize());

        // Initialize request body
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        // Initialize CORS
        this.app.use(cors());

        // Paper middleware
        const paperRouter = paper.getRoutes();
        this.app.use(paperRouter);
    }

    private initializePaper(environment: "development" | "production") {
        // Create a new paper wrapper instance with the given config
        const paper = new Paper({
            environment: environment,
            suppressMessages: true,
            suppressWarnings: false
        });

        // Register the paper modules
        paper.addModules([
            new UserModule(),
            new ProfileModule(),
            new FileModule()
        ]);

        // TODO: MOVE THIS BACK TO CONSTRUCTOR
        this.setupMiddleware(paper);
    }
}

export default RestAPI;
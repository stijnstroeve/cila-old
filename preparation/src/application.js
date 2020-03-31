import System from './models/system';
import {LOG_PREFIX} from './constants';

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
        console.log(LOG_PREFIX, 'Starting...');

        this.state = ApplicationState.STARTING;
        this.system = new System();

        this._startInterval();
    }

    /**
     * Stops the application
     */
    stop() {
        console.log(LOG_PREFIX, 'Stopping...');

        this.state = ApplicationState.STOPPED;

        // Clear the interval
        if(this.interval !== undefined) {
            clearInterval(this.interval);
        }
    }

    _startInterval() {
        this.interval = setInterval(() => this._tick(), 1000);
    }

    _tick() {
        if(this.system !== undefined) {
            console.log(LOG_PREFIX, 'Tick');
        }
    }
}
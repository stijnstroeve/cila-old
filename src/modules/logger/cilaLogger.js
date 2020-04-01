import Color from './color';
import {loggerPrefixColor} from './constants';

export default class CilaLogger {
    /**
     * Logs the given message to the console
     * @param message The message to log
     */
    static log(message) {
        console.log(this._getPrefix(), message);
    }

    static _getPrefix() {
        return loggerPrefixColor + '[' + this._getCurrentTime() + ']' + Color.RESET;
    }

    static _getCurrentTime() {
        return new Date().toLocaleTimeString();
    }
}
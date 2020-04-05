import Color from './Color';
import {loggerPrefixColor} from './constants';

// TODO: Maybe use winston instead of this?
export default class CilaLogger {
    /**
     * Logs the given message to the console
     * @param message The message to log
     */
    static log(message) {
        // eslint-disable-next-line no-console
        console.log(this._getPrefix(), message);
    }

    static _getPrefix() {
        return loggerPrefixColor + '[' + this._getCurrentTime() + ']' + Color.RESET;
    }

    static _getCurrentTime() {
        return new Date().toLocaleTimeString();
    }
}
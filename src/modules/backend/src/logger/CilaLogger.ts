import Color from './Color';
import {loggerPrefixColor} from './constants';

// TODO: Maybe use winston instead of this?
class CilaLogger {

    /**
     * Logs the given message to the console
     * @param message The message to log
     */
    static log(message: any) {
        // eslint-disable-next-line no-console
        console.log(CilaLogger.getPrefix(), message);
    }

    private static getPrefix() {
        return loggerPrefixColor + '[' + CilaLogger.getCurrentTime() + ']' + Color.RESET;
    }

    private static getCurrentTime() {
        return new Date().toLocaleTimeString();
    }
}

export default CilaLogger;
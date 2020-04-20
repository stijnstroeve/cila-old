import Color from './Color';

// TODO: Maybe use winston instead of this?
class CilaLogger {
    public static readonly LOGGER_PREFIX_COLOR: Color = Color.BLUE;

    /**
     * Logs the given message to the console
     * @param message The message to log
     */
    static log(message: any) {
        // eslint-disable-next-line no-console
        console.log(CilaLogger.getPrefix(), message);
    }

    private static getPrefix() {
        return CilaLogger.LOGGER_PREFIX_COLOR + '[' + CilaLogger.getCurrentTime() + ']' + Color.RESET;
    }

    private static getCurrentTime() {
        return new Date().toLocaleTimeString();
    }
}

export default CilaLogger;
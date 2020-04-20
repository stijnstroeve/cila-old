import winston, {Logger} from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import Configuration from '../Core/Configuration';

/**
 * Winston Logging
 *
 * Makes sure all errors that are logged with "winstonLogger.Error()"
 * are logged in a file that will be rotated every day so that the
 * log file won't get too big.
 * @type {winston.Logger}
 */
class WinstonLogger {

    public static getWinstonLogger(): Logger {
        const config = Configuration.getInstance();

        return winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [
                new DailyRotateFile({
                    filename: 'logs/%DATE%.Error.log',
                    level: 'error',
                    maxSize: config.values.max_log_file_size,
                    maxFiles: config.values.max_log_files,
                    zippedArchive: true
                })
            ]
        });
    }

}

export default WinstonLogger;
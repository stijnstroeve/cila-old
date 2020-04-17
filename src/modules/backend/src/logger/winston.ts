/**
 * Configurations of winston
 */
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import config from '../core/configurations/config.json';

/**
 * Winston logger
 *
 * Makes sure all errors that are logged with "winstonLogger.error()"
 * are logged in a file that will be rotated every day so that the
 * log file won't get too big.
 * @type {winston.Logger}
 */
const winstonLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new DailyRotateFile({
            filename: 'logs/%DATE%.error.log',
            level: 'error',
            maxSize: config.max_log_file_size,
            maxFiles: config.max_log_files,
            zippedArchive: true
        })
    ]
});

export default winstonLogger;
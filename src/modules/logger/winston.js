/**
 * Configurations of winston
 */
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import config from '../core/configurations/config';

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
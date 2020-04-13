import {ErrorType, Error} from 'paper-wrapper';
import winstonLogger from '../logger/winston';

ErrorType.registerType('UNKNOWN_CREDENTIALS', 1, 'Unknown email or password.', 401);
ErrorType.registerType('UNAUTHORIZED', 2, 'You are not authorized to access this resource.', 401);
ErrorType.registerType('USER_EXISTS', 3, 'A user with this email already exists.', 409);

/**
 * Creates a paper-wrapper error
 * @param errorType The type of error(can be string or type itself)
 * @param nativeError The native error(optional)
 * @returns {Error}
 * @constructor
 */
const ResultError = (errorType, nativeError) => {
    if(typeof errorType === 'string') {
        errorType = ErrorType.get(errorType);
    }
    const error = new Error(errorType);
    winstonLogger.error({
        paperError: error,
        nativeError: nativeError || undefined
    });
    return error;
};

export default ResultError;
export {ErrorType};
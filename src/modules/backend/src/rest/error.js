import {ErrorType, Error} from 'paper-wrapper';
import winstonLogger from '../logger/winston';

ErrorType.registerType('UNKNOWN_CREDENTIALS', 1, 'Unknown email or password.', 401);
ErrorType.registerType('UNAUTHORIZED', 2, 'You are not authorized to access this resource.', 401);
ErrorType.registerType('USER_EXISTS', 3, 'A user with this email already exists.', 409);
ErrorType.registerType('INVALID_PARAMETER', 4, 'Invalid parameter.', 401);
ErrorType.registerType('FILE_NOT_FOUND', 5, 'Uploaded file was not found.', 401);
ErrorType.registerType('RESOURCE_EXISTS', 6, 'Resource already exists.', 409);
ErrorType.registerType('FILE_UPLOAD_ERROR', 7, 'An error occurred while uploading a file.', 401);

/**
 * Creates a paper-wrapper error
 * @param errorType The type of error(can be string or type itself)
 * @param nativeError The native error(optional)
 * @param description The message to send with the error
 * @returns {Error}
 * @constructor
 */
const ResultError = (errorType, nativeError, description) => {
    if(typeof errorType === 'string') {
        errorType = ErrorType.get(errorType);
    }
    // Use a clone of the error type, so mutating it will not mutate the original
    errorType = JSON.parse(JSON.stringify(errorType));

    const error = new Error(errorType);
    winstonLogger.error({
        paperError: error,
        nativeError: nativeError || undefined
    });

    if(description) {
        error.type.description = description;
    }
    return error;
};

export default ResultError;
export {ErrorType};
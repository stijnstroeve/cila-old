import {ErrorType, Error} from 'paper-wrapper';
import winstonLogger from '../logger/winston';

ErrorType.registerType('UNKNOWN_CREDENTIALS', 1, 'Unknown email or password.', 401);
ErrorType.registerType('UNAUTHORIZED', 2, 'You are not authorized to access this resource.', 401);
ErrorType.registerType('USER_EXISTS', 3, 'A user with this email already exists.', 409);
ErrorType.registerType('INVALID_PARAMETER', 4, 'Invalid parameter.', 400);
ErrorType.registerType('FILE_NOT_FOUND', 5, 'Uploaded file was not found.', 400);
ErrorType.registerType('RESOURCE_EXISTS', 6, 'Resource already exists.', 409);
ErrorType.registerType('NO_FILES_UPLOADED', 7, 'No files were uploaded.', 400);
ErrorType.registerType('TOO_MANY_FILES', 8, 'Too many files were uploaded in form-data field "[FIELD]"', 400);
ErrorType.registerType('FILE_TOO_LARGE', 9, 'Uploaded file is too large.', 400);
ErrorType.registerType('MIME_TYPE_NOT_ALLOWED', 10, 'Uploaded file mime type is not allowed.', 400);

/**
 * Creates a paper-wrapper error
 * @param errorType The type of error(can be string or type itself)
 * @param nativeError The native error(optional)
 * @param options Options of the error
 * @returns {Error}
 * @constructor
 */
const ResultError = (errorType, nativeError, options) => {
    options = options || {};
    if(typeof errorType === 'string') {
        errorType = ErrorType.get(errorType);
    }
    // Use a clone of the error type, so mutating it will not mutate the original
    errorType = JSON.parse(JSON.stringify(errorType));

    const error = new Error(errorType, null, options.variables);
    winstonLogger.error({
        paperError: error,
        nativeError: nativeError || undefined,
        stack: nativeError ? nativeError.stack : undefined
    });

    if(options.description) {
        error.type.description = options.description;
    }
    return error;
};

export default ResultError;
export {ErrorType};
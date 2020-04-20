import {ErrorType, Error} from 'paper-wrapper';
import WinstonLogger from '../Logging/WinstonLogger';

// Register all error types
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
ErrorType.registerType('CAST_ERROR', 11, 'Parameter field(s) could not be cast to right type.', 400);
ErrorType.registerType('DOCUMENT_NOT_FOUND', 12, 'Document with [FIELD]=[VALUE] not found.', 400);

/**
 *
 * TODO: Redo the whole error/exception handling of the code
 *
 */


/**
 * Creates a paper-wrapper Error
 * @param errorType The type of Error(can be string or type itself)
 * @param nativeError The native Error(optional)
 * @param options Options of the Error
 * @returns {Error}
 * @constructor
 */
const ResultError = (errorType: ErrorType | string, nativeError?: any, options?: {variables?: any, description?: string}) => {
    options = options || {};

    if (typeof errorType === 'string') {
        errorType = ErrorType.get(errorType);
    }

    // Use a clone of the Error type, so mutating it will not mutate the original
    errorType = JSON.parse(JSON.stringify(errorType));

    // @ts-ignore Ignore because errortype is cloned, which changes the type
    const error = new Error(errorType, null, options.variables);

    WinstonLogger.getWinstonLogger().error({
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
import {MONGODB_CAST_ERROR, MONGODB_DUPLICATION_KEY, MONGODB_OTHER_KEY, MONGODB_VALIDATION_ERROR} from './constants';
import ResultError from '../rest/error';
import {MongoError} from 'mongodb';

// TODO: MONGODB_NOT_FOUND_ERROR
const getMongoError = ((mongodbError: MongoError) => {
    if(mongodbError.name === 'MongoError') {
        switch(mongodbError.code) {
            case 11000:
                return MONGODB_DUPLICATION_KEY;
            default:
                return MONGODB_OTHER_KEY;
        }
    } else if(mongodbError.name === 'ValidationError') {
        return MONGODB_VALIDATION_ERROR;
    } else if(mongodbError.name === 'CastError') {
        return MONGODB_CAST_ERROR;
    }
    return MONGODB_OTHER_KEY;
});

/**
 * Handles the given mongodb error
 * @param err
 * @param options
 * @returns {Error}
 */
const DEFAULT_DUPLICATE_ERROR = 'RESOURCE_EXISTS';

const handleMongoError = (err: MongoError, options = {duplicateKey: DEFAULT_DUPLICATE_ERROR}) => {
    // Make sure the "duplicateKey" is in the options
    if(!('duplicateKey' in options)) {
        options = {duplicateKey: DEFAULT_DUPLICATE_ERROR};
    }

    const errorType = getMongoError(err);
    if(errorType === MONGODB_DUPLICATION_KEY) {
        return ResultError(options.duplicateKey, err);
    } else if(errorType === MONGODB_VALIDATION_ERROR) {
        return ResultError('INVALID_PARAMETER', err, {description: err.message});
    } else if(errorType === MONGODB_CAST_ERROR) {
        return ResultError('CAST_ERROR', err, {description: err.message});
    } else {
        return ResultError('UNKNOWN', err);
    }
};

export {handleMongoError, getMongoError};
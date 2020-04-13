import ResultError from '../rest/error';

export const handleFileError = (err) => {
    if(err.name === 'MulterError') {
        if(err.code === 'LIMIT_UNEXPECTED_FILE') {
            // Too many files uploaded
            return ResultError('TOO_MANY_FILES', err, {
                variables: [
                    {name: 'FIELD', variable: err.field || 'unknown'}
                ]
            });
        } else if(err.code === 'LIMIT_FILE_SIZE') {
            // The uploaded file was larger than defined in config
            return ResultError('FILE_TOO_LARGE', err);
        } else if(err.code === 'MIME_TYPE_NOT_ALLOWED') {
            // The uploaded file was larger than defined in config
            return ResultError('MIME_TYPE_NOT_ALLOWED', err);
        }

    }
    return ResultError('UNKNOWN_ERROR', err);
};
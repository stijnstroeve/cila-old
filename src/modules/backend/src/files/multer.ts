import multer from 'multer';
import {getFullUploadPath, parseFilename} from './index';
import config from '../core/configurations/config.json';
import {ALLOWED_MIME_TYPES} from './constants';
import {CodedError} from '../rest/error/CodedError';

/**
 * Handles the storage of multer(form-data file parser)
 * @type {DiskStorage}
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, getFullUploadPath())
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        // Parse the original file name
        const parsedOriginalName = parseFilename(file.originalname);

        // Put together the full filename.
        const filename = uniqueSuffix + '-' + parsedOriginalName;
        cb(null, filename)
    }
});

const multerUpload = multer({
    storage,
    limits: {
        fieldSize: config.max_file_size_in_bytes,
        fileSize: config.max_file_size_in_bytes
    },
    fileFilter: (req, file, cb) => {
        // Only allow the mime types that are accepted
        if(!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            // Create a coded error so it will be picked up in the handleFileError

            // @ts-ignore
            cb(new CodedError('MIME_TYPE_NOT_ALLOWED', null), false);
        }

        // Mime type is accepted
        cb(null, true);
    }
});

export default multerUpload;
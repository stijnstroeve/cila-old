import multer from 'multer';
import {getFullUploadPath, parseFilename} from './index';

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
    storage
});

export default multerUpload;
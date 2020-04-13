import multer from 'multer';
import {parseFilename} from './helper';

/**
 * Handles the storage of multer(form-data file parser)
 * @type {DiskStorage}
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/data/uploads/')
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
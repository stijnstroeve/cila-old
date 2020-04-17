import config from '../core/configurations/config.json';
import * as fs from 'fs';
import {FILE_UPLOAD_PATH_PREFIX} from './constants';

const getFullUploadPath = () => {
    return FILE_UPLOAD_PATH_PREFIX + config.file_upload_path;
};

/**
 * Parses the given filename
 * @param filename
 */
const parseFilename = (filename: string) => {
    // First lowercase the filename
    filename = filename.toLowerCase();

    // Remove all whitespaces
    filename = filename.replace(/\s/g,'');

    return filename;
};

const initializeFileUpload = () => {
    const uploadPath = getFullUploadPath();

    if (!fs.existsSync(uploadPath)){
        fs.mkdirSync(uploadPath, {
            recursive: true
        });
    }
};

export {getFullUploadPath, parseFilename, initializeFileUpload};
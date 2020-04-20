import multer, {FileFilterCallback, StorageEngine} from 'multer';
import {CodedError} from '../Http/Error/CodedError';
import Configuration from '../Core/Configuration';
import FileModule from './FileModule';
import FileSystem from './FileSystem';

class MulterHandler {
    public static multerUpload: any;
    private static storage: StorageEngine;

    public static register(): void {
        this.initializeUploadDirectory();

        this.storage = this.getDiskStorage();
        this.multerUpload = this.getMulterUpload();
    }

    /**
     * Initialize the upload directory for file uploads
     */
    private static initializeUploadDirectory(): void {
        FileSystem.createDirectorySync(
            this.getUploadDirectoryPath()
        );
    }

    /**
     * Gets the disk storage from the multer package
     * This disk storage configures where the uploaded files will be saved.
     */
    private static getDiskStorage(): StorageEngine {
        return multer.diskStorage({

            destination: (req, file, cb) => {
                cb(null, this.getUploadDirectoryPath())
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

                // Parse the original file name
                const parsedOriginalName = FileSystem.slugifyFileName(file.originalname);

                // Put together the full filename.
                const filename = uniqueSuffix + '-' + parsedOriginalName;
                cb(null, filename)
            }
        });
    }

    /**
     * Get the multer upload
     */
    private static getMulterUpload(): any {
        const allowedMimeTypes = FileModule.getAllowedMimeTypes();
        const config = Configuration.getInstance();

        // The limits of the upload
        const fileLimits = {
            // Max size of the file(can also be text)
            fieldSize: config.values.max_file_size_in_bytes,

            // Max uploaded file size
            fileSize: config.values.max_file_size_in_bytes
        };

        const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
            // Only allow the mime types that are accepted
            if(!allowedMimeTypes.includes(file.mimetype)) {
                // Create a coded Error so it will be picked up in the handleFileError

                // @ts-ignore
                cb(new CodedError('MIME_TYPE_NOT_ALLOWED', null), false);
            }

            // Mime type is accepted
            cb(null, true);
        };

        return multer({
            storage: this.storage,
            limits: fileLimits,
            fileFilter: fileFilter
        });
    }

    /**
     * Gets the full upload path where files should be uploaded
     * @returns {string}
     */
    public static getUploadDirectoryPath(): string {
        return FileModule.FILE_UPLOAD_PATH_PREFIX + Configuration.getInstance().values.file_upload_path;
    }

}

export default MulterHandler;


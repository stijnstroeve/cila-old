import {ModuleMethod, RequestType} from 'paper-wrapper';
import {AuthorizationMiddleware} from '../../middleware/AuthorizationMiddleware';
import multerUpload from '../../../files/multer';
import File from '../../../database/models/File';
import ResultError from '../../error';
import {handleMongoError} from '../../../database/mongoError';

export class UploadFileMethod extends ModuleMethod {
    constructor() {
        super();

        this.optionalParameters = [];
        this.request = 'upload-file';
        this.requestType = RequestType.POST;
        this.requiredParameters = [];
        this.middleware = [new AuthorizationMiddleware()];
    }

    _handleFile(request, file) {
        return new Promise((resolve, reject) => {

            // Create the file database model
            const fileModel = new File({
                filename: file.filename,
                fileSize: file.size,
                mimeType: file.mimetype
            });

            fileModel.setDownloadUrl(file);
            fileModel.calculateHash(file).then(() => {

                // Save the file in the database
                fileModel.save((err) => {
                    if (err) {
                        reject(
                            handleMongoError(err)
                        );
                    }
                    resolve(fileModel.toJSON());
                });
            }).catch((err) => {
                // There was an error while reading the file
                reject(
                    ResultError('FILE_NOT_FOUND', err)
                );
            });

        });

    }

    handle(request) {
        const upload = multerUpload.any('uploaded_file');
        return upload(request.request, request.response, async (err) => {
            // TODO: Max size error, etc...
            if(err) return request.error(
                ResultError('FILE_UPLOAD_ERROR', err)
            );

            const files = request.request.files;
            if(Array.isArray(files)) {
                const fileResults = [];

                // Handle all files in the request
                for(const file of files) {

                    // Uses await so the files will be handled in sequence
                    await this._handleFile(request, file).then((fileResult) => {
                        fileResults.push(fileResult);
                    }).catch((err) => {
                        request.error(err);
                    });
                }

                // Send all file results back to the client
                request.respond(fileResults);
            }

        });
    }

}
import {IParameter, Middleware, ModuleMethod, ModuleRequest, RequestType, Error as PaperError} from 'paper-wrapper';
import {AuthorizationMiddleware} from '../../middleware/AuthorizationMiddleware';
import multerUpload from '../../../files/multer';
import File from '../../../database/models/File';
import ResultError from '../../error';
import {handleMongoError} from '../../../database/mongoError';
import config from '../../../core/configurations/config.json';
import {handleFileError} from '../../../files/fileError';

class UploadFileMethod implements ModuleMethod {

    public request: string = 'upload-file';
    public requestType: RequestType = RequestType.POST;
    public optionalParameters: IParameter[] = [];
    public requiredParameters: IParameter[] = [];
    public middleware: Middleware[] = [new AuthorizationMiddleware()];

    private handleFile(file: Express.Multer.File) {
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
            }).catch((err: Error) => {
                // There was an error while reading the file
                reject(
                    ResultError('FILE_NOT_FOUND', err)
                );
            });

        });
    }

    handle(request: ModuleRequest) {
        const upload = multerUpload.fields([
            {name: 'files', maxCount: config.max_upload_files}
        ]);
        return upload(request.request, request.response, async (err) => {
            if(err) return request.error(
                handleFileError(err)
            );

            // Grab the files out of the "files" field
            const files = request.request.files.files;

            if(Array.isArray(files)) {
                const fileResults: any = [];

                // Handle all files in the request
                for(const file of files) {

                    // Uses await so the files will be handled in sequence
                    await this.handleFile(file).then((fileResult) => {
                        fileResults.push(fileResult);
                    }).catch((err: PaperError) => {
                        request.error(err);
                    });
                }

                // Send all file results back to the client
                request.respond(fileResults);
            } else {
                return request.error(
                    ResultError('NO_FILES_UPLOADED')
                );
            }

        });
    }

}

export {UploadFileMethod};
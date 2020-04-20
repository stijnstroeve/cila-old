import {IParameter, Middleware, ModuleMethod, ModuleRequest, RequestType, Error as PaperError} from 'paper-wrapper';
import {AuthorizationMiddleware} from '../../../Middleware/AuthorizationMiddleware';
import File from '../../../../Database/Models/File';
import ResultError from '../../../HttpError';
import {handleMongoError} from '../../../../Database/MongoError';
import {handleFileError} from '../../../../File/FileError';
import Configuration from '../../../../Core/Configuration';
import MulterHandler from '../../../../File/MulterHandler';

class UploadFileMethod implements ModuleMethod {

    public request: string = 'upload-file';
    public requestType: RequestType = RequestType.POST;
    public optionalParameters: IParameter[] = [];
    public requiredParameters: IParameter[] = [];
    public middleware: Middleware[] = [new AuthorizationMiddleware()];

    private handleFile(file: Express.Multer.File) {
        return new Promise((resolve, reject) => {

            // Create the file Database model
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
                // There was an Error while reading the file
                reject(
                    ResultError('FILE_NOT_FOUND', err)
                );
            });

        });
    }

    handle(request: ModuleRequest) {
        const upload = MulterHandler.multerUpload.fields([
            // Make sure only the "files" field can contain the max amount of files
            {name: 'files', maxCount: Configuration.getInstance().values.max_upload_files}
        ]);

        return upload(request.request, request.response, async (err: Error) => {
            if(err) return request.error(
                handleFileError(err)
            );

            // Grab the File out of the "File" field
            const files = request.request.files.files;

            if(Array.isArray(files)) {
                const fileResults: any = [];

                // Handle all File in the request
                for(const file of files) {

                    // Uses await so the File will be handled in sequence
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
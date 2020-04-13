import {Middleware} from 'paper-wrapper';
import multerUpload from '../../files/multer';

export class FileMiddleware extends Middleware {
    handle(module, method, request) {
        return multerUpload.any('uploaded_file');
    }
}

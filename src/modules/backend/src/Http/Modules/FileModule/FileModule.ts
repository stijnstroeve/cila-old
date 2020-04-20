import {Module, ModuleMethod} from 'paper-wrapper';
import {UploadFileMethod} from './Methods/UploadFileMethod';

class FileModule implements Module {

    public name: string = 'file';
    public moduleMethods: ModuleMethod[] = [
        new UploadFileMethod()
    ];
}

export default FileModule;
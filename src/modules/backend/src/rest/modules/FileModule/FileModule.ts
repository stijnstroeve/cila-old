import {Module, ModuleMethod} from 'paper-wrapper';
import {UploadFileMethod} from './UploadFileMethod';

class FileModule implements Module {

    public name: string = 'file';
    public moduleMethods: ModuleMethod[] = [
        new UploadFileMethod()
    ];
}

export default FileModule;
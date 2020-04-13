import {Module} from 'paper-wrapper';
import {UploadFileMethod} from './UploadFileMethod';

export default class FileModule extends Module {
    constructor() {
        super();

        this.moduleMethods = [
            new UploadFileMethod()
        ];
        this.name = 'file';
    }
}
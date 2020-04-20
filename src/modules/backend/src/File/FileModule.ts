import AbstractModule from '../Core/Modules/AbstractModule';
import MulterHandler from './MulterHandler';

class FileModule extends AbstractModule {

    public name: string = 'FileModule';
    public registerOnTest: boolean = true;

    /**
     * All image mime types that can be uploaded
     * @type {string[]}
     */
    public static readonly IMAGE_MIME_TYPES = [
        'image/jpeg',
        'image/png',
        'image/svg+xml',
        'image/tiff',
    ];

    public static readonly FILE_UPLOAD_PATH_PREFIX = 'public';

    public register() {
        MulterHandler.register();
    }

    /**
     * All allowed mime types that are allowed to be uploaded
     * @type {string[]}
     */
    public static getAllowedMimeTypes(): Array<string> {
        return [
            ...FileModule.IMAGE_MIME_TYPES
        ];
    }

}

export default FileModule;
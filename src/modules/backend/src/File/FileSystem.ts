import fs from 'fs';

class FileSystem {

    /**
     * Create a directory recursively if it does not exist yet
     * This function is synchronous, so please only use it for initialization
     * @param {string} path The path of the directory to create
     */
    public static createDirectorySync(path: string): void {
        console.log(path);
        if (!fs.existsSync(path)){
            fs.mkdirSync(path, {
                recursive: true
            });
        }
    }

    /**
     * Slugifies the given file name for use in url's
     *
     * What it does:
     * - lowercases the file name
     * - removes all spaces for file name
     *
     * @param {string} fileName
     * @returns {string}
     */
    public static slugifyFileName(fileName: string): string {
        // First lowercase the filename
        fileName = fileName.toLowerCase();

        // Remove all whitespaces
        fileName = fileName.replace(/\s/g,'');

        return fileName;
    }

}

export default FileSystem;
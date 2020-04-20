import mongoose from 'mongoose';
import crypto from 'crypto';
import fs from 'fs';
import multer from 'multer';
import {CodedError} from '../../Http/Error/CodedError';

interface IFile extends mongoose.Document {
    filename: string;
    downloadUrl: string;
    hash: string;
    hashType: string;
    fileSize: number;
    mimeType: string;
    deleted: boolean;

    calculateHash(file: Express.Multer.File): Promise<any>;
    setDownloadUrl(file: Express.Multer.File): Function;
    toJSON(): Function;
}

interface IFileModel extends mongoose.Model<IFile> {
    findAndValidate(fileId: number, options?: {mimeTypes?: Array<string>}): Promise<IFile>;
}

const FileSchema = new mongoose.Schema({
    filename: {
        type: String,
        unique: true,
        required: [true, 'Filename is required']
    },
    downloadUrl: {
        type: String,
        required: [true, 'Download url is required']
    },
    hash: {
        type: String,
        required: [true, 'Hash is required']
    },
    hashType: {
        type: String,
        required: [true, 'Hash type is required']
    },
    fileSize: {
        type: Number,
        required: [true, 'File size is required']
    },
    mimeType: {
        type: String,
        required: [true, 'File mime type is required']
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

FileSchema.methods.calculateHash = function(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {

        // Read the file in the file's path
        const readStream = fs.createReadStream(file.path, 'utf8');

        const hashType = 'md5';
        const hash = crypto.createHash(hashType);

        readStream.on('data', (chunk) => {
            // Update the hash with the read data chunk
            hash.update(chunk);
        });

        readStream.on('end', () => {
            this.hashType = hashType;
            this.hash = hash.digest('hex');

             resolve(this.hash);
        });

        readStream.on('error', (err) => {
            reject(err);
        });
    });
};

FileSchema.methods.setDownloadUrl = function(file: Express.Multer.File) {
    this.downloadUrl = '/' + file.destination + file.filename;
};

FileSchema.methods.toJSON = function() {
    return {
        id: this._id,
        filename: this.filename,
        downloadUrl: this.downloadUrl,
        hash: this.hash,
        hashType: this.hashType,
        fileSize: this.fileSize,
        mimeType: this.mimeType
    };
};

FileSchema.statics.findAndValidate = function(id: number, options?: {mimeTypes?: Array<string>}) { // TODO: Maybe make interface of Array?
    options = options || {};

    return new Promise((resolve, reject) => {
        this.findOne({_id: id}, (err: mongoose.Error, file: IFile) => {
            if (err) return reject(err);

            if(options.mimeTypes) {
                // Reject all invalid mime types
                if(!options.mimeTypes.includes(file.mimeType)) {
                    return reject(new CodedError('MIME_TYPE_NOT_ALLOWED', null));
                }
            }

            resolve(file);
        });
    });

};

const File = mongoose.model<IFile, IFileModel>('File', FileSchema);

export default File;
export {IFile, FileSchema}
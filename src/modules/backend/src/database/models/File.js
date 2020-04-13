import mongoose from 'mongoose';
import crypto from 'crypto';
import fs from 'fs';

const Schema = mongoose.Schema;

export const FileSchema = new Schema({
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
        type: String,
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

FileSchema.methods.calculateHash = function(file) {
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

             resolve();
        });

        readStream.on('error', (err) => {
            reject(err);
        });
    });
};

FileSchema.methods.setDownloadUrl = function(file) {
    this.downloadUrl = '/' + file.destination + file.filename;
};

FileSchema.methods.toJSON = function() {
    return {
        filename: this.filename,
        downloadUrl: this.downloadUrl,
        hash: this.hash,
        hashType: this.hashType,
        fileSize: this.fileSize,
        mimeType: this.mimeType
    };
};

const File = mongoose.model('File', FileSchema);

export default File;
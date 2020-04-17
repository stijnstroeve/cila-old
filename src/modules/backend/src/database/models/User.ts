import mongoose from 'mongoose';
import crypto, {BinaryLike} from 'crypto';
import * as jwt from 'jsonwebtoken';
import config from '../../core/configurations/config.json';
import File, {IFile} from './File';
import {IProfile, ProfileSchema} from './Profile';
import {IMAGE_MIME_TYPES} from '../../files/constants';

const hashPassword = (password: BinaryLike, salt: BinaryLike) => {
    return crypto.pbkdf2Sync(password, salt, config.password_iterations, config.password_key_length, 'sha512').toString('hex');
};

interface IUser extends mongoose.Document {
    username: string;
    email: string;
    hash: string;
    salt: string;
    profile: IProfile;
    disabled: boolean;

    setPassword(password: BinaryLike): Function;
    validPassword(password: BinaryLike): Function;
    generateJWT(): Function;
    setProfilePicture(): Promise<any>;
    toJSON(): Function;
    toAuthJSON(): Function;
}

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required'],
        match: [/^[a-zA-Z0-9]+$/, 'Please fill in a valid username'],
        index: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is required'],
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill in a valid email address'],
        index: true
    },
    hash: String,
    salt: String,
    profile: ProfileSchema,
    disabled: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

UserSchema.methods.setPassword = function(password: BinaryLike) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = hashPassword(password, this.salt)
};

UserSchema.methods.validPassword = function(password: BinaryLike) {
    const hash = hashPassword(password, this.salt);
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + config.jwt_lifetime_days);

    return jwt.sign({
        'id': this._id,
        'exp': parseInt(String(exp.getTime() / 1000)),
    }, config.jwt_secret);
};

UserSchema.methods.setProfilePicture = function(fileId: number) {
    return new Promise((resolve, reject) => {
        if(fileId) {
            File.findAndValidate(fileId, {
                // Make sure the file is an image
                mimeTypes: IMAGE_MIME_TYPES
            }).then((file: IFile) => {
                this.profile = {
                    pictureFile: file.downloadUrl
                };

                resolve();
            }).catch(reject);
        } else {
            this.profile = {
                pictureFile: undefined
            };
            resolve();
        }

    })
};

UserSchema.methods.toJSON = function() {
    return {
        username: this.username,
        email: this.email,
        profile: this.profile.toJSON()
    };
};

UserSchema.methods.toAuthJSON = function() {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT()
    };
};

UserSchema.methods.toAuthJSON = function() {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT()
    };
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
export {IUser, UserSchema};
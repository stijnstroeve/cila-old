import mongoose from 'mongoose';
import crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import config from '../../core/configurations/config';

const Schema = mongoose.Schema;

const hashPassword = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, config.password_iterations, config.password_key_length, 'sha512').toString('hex');
};

export const UserSchema = new Schema({
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
    disabled: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = hashPassword(password, this.salt)
};

UserSchema.methods.validPassword = function(password) {
    const hash = hashPassword(password, this.salt);
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + config.jwt_lifetime_days);

    return jwt.sign({
        'id': this._id,
        'exp': parseInt(exp.getTime() / 1000),
    }, config.jwt_secret);
};

UserSchema.methods.toAuthJSON = function() {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT()
    };
};
const User = mongoose.model('User', UserSchema);

export default User;
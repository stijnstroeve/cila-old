import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ProfileSchema = new Schema({
    pictureFile: String
}, {
    timestamps: true
});

ProfileSchema.methods.toJSON = function() {
    return {
        pictureFile: this.pictureFile
    };
};
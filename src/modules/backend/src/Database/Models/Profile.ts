import mongoose from 'mongoose';

interface IProfile extends mongoose.Document {
    pictureFile: string;

    toJSON(): Function
}

const ProfileSchema = new mongoose.Schema({
    pictureFile: String
}, {
    timestamps: true
});

ProfileSchema.methods.toJSON = function() {
    return {
        pictureFile: this.pictureFile
    };
};

export {IProfile, ProfileSchema};

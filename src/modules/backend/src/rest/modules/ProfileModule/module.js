import {Module} from 'paper-wrapper';
import {SetProfilePictureMethod} from './SetProfilePictureMethod';
import {DeleteProfilePictureMethod} from './DeleteProfilePictureMethod';

export default class ProfileModule extends Module {
    constructor() {
        super();

        this.moduleMethods = [
            new SetProfilePictureMethod(),
            new DeleteProfilePictureMethod()
        ];
        this.name = 'profile';

        // Set the parent module to the UserModule so the path will be /user/profile
        this.parentModule = 'user';
    }
}
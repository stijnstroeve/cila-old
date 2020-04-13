import {Module} from 'paper-wrapper';
import {SetProfilePictureMethod} from './SetProfilePictureMethod';

export default class ProfileModule extends Module {
    constructor() {
        super();

        this.moduleMethods = [
            new SetProfilePictureMethod()
        ];
        this.name = 'profile';

        // Set the parent module to the UserModule so the path will be /user/profile
        this.parentModule = 'user';
    }
}
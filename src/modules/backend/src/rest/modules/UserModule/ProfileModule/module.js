import {Module} from 'paper-wrapper';

export default class ProfileModule extends Module {
    constructor() {
        super();

        this.moduleMethods = [

        ];
        this.name = 'profile';

        // Set the parent module to the UserModule so the path will be /user/profile
        this.parentModule = 'user';
    }
}
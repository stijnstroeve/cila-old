import {Module, ModuleMethod} from 'paper-wrapper';
import {SetProfilePictureMethod} from './Methods/SetProfilePictureMethod';
import {DeleteProfilePictureMethod} from './Methods/DeleteProfilePictureMethod';

class ProfileModule implements Module {

    public name: string = 'profile';
    public moduleMethods: ModuleMethod[] = [
        new SetProfilePictureMethod(),
        new DeleteProfilePictureMethod()
    ];
    public parentModule: string = 'user';
}

export default ProfileModule;
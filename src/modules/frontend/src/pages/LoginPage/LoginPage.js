import React, {useState} from 'react';
import LoginDialog from './LoginDialog';


// TODO: Add snackbar when logged in https://material-ui.com/components/snackbars/
const LoginPage = () => {
    const [open, setOpen] = useState(true);

    const handleClose = () => setOpen(false);

    return (
        <LoginDialog open={open} onClose={handleClose} />
    );
};

export default LoginPage;
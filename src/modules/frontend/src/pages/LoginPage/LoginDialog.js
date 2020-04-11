import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import {useHistory} from 'react-router-dom';
import * as Yup from 'yup';
import {loginUser} from '../../services/auth/actions';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const LoginDialog = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [globalError, setGlobalError] = useState('');

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={async (values) => {
                await new Promise((resolve) => {
                    props.loginUser(values.email, values.password,
                        // Success callback
                        () => {
                            alert('Welcome!');
                            // TODO Send user to home page.
                            history.push('/');
                        },
                        // Error callback
                        (error) => {
                            // Set the global error
                            if(typeof error === 'string') {
                                setGlobalError(error);
                            }
                            resolve();
                        });
                });
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email('Not a valid email')
                    .required('Required'),
                password: Yup.string()
                    .required('Required')
            })}
        >
            {props => {
                const {
                    values,
                    errors,
                    isSubmitting,
                    handleSubmit
                } = props;
                return (
                    <Dialog
                        open={true}
                        aria-labelledby={'form-dialog-title'}
                        aria-describedby={'form-dialog-description'}
                    >
                        <DialogTitle id={'form-dialog-title'}>Log in</DialogTitle>

                        <DialogContent>
                            <DialogContentText id={'form-dialog-description'}>
                                Use your email and password to log into Cila
                            </DialogContentText>
                            <form className={classes.root} onSubmit={handleSubmit}>

                                <TextField
                                    name={'email'}
                                    label={'Email'}
                                    error={!!errors.email || !!globalError}
                                    helperText={errors.email}
                                    variant={'outlined'}
                                    size={'small'}
                                    type={'email'}
                                    value={values.email}
                                    onChange={props.handleChange}
                                    autoFocus
                                />
                                <TextField
                                    name={'password'}
                                    label={'Password'}
                                    error={!!errors.password || !!globalError}
                                    helperText={errors.password || globalError}
                                    variant={'outlined'}
                                    size={'small'}
                                    type={'password'}
                                    value={values.password}
                                    onChange={props.handleChange}
                                />
                                <DialogActions>
                                    <Button type={'submit'} disabled={isSubmitting}>
                                        Log in
                                    </Button>
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </Dialog>
                );
            }}
        </Formik>)
};

export default connect(null, {loginUser})(LoginDialog);
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import {useHistory} from 'react-router-dom';
import * as Yup from 'yup';
import {loginUser, setJWT} from '../../services/auth/actions';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import {useSnackbar} from 'notistack';

const useStyles = makeStyles((theme) => {
    console.log(theme);
    return {root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    rootContainer: {
        height: '100vh',
        backgroundColor: theme.palette.primary[400]
    }
}});

const LoginDialog = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();

    const [globalError, setGlobalError] = useState('');

    const formSubmit = (resolve, values) => {
        props.loginUser(values.email, values.password,
            // Success callback
            (data) => {
                if(data.token) {
                    // Set the JSON web token in the client
                    props.setJWT(data.token);
                }

                enqueueSnackbar('Successfully logged in!', {variant: 'success'});
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
    };

    return (
        <div className={classes.rootContainer}>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={async (values) => {
                    await new Promise((resolve) => formSubmit(resolve, values));
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Not a valid email')
                        .required('Required'),
                    password: Yup.string()
                        .required('Required')
                })}
            >
                {(props) => {
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
            </Formik>
        </div>
    )
};

export default connect(null, {loginUser, setJWT})(LoginDialog);
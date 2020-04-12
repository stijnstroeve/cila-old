import React from 'react';
import Router from './routes/router';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './services/store';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import {MuiThemeProvider as ThemeProvider} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import makeStyles from '@material-ui/core/styles/makeStyles';

// TODO: Move this to a separate file
const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: green,
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary[400],
        height: '100vh'
    }
}));

/**
 * Component that wraps all pages for global styling
 * @param props
 * @returns {*}
 * @constructor
 */
const RootWrapper = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {props.children}
        </div>
    );
};

// TODO Persist Gate loader
const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <RootWrapper>
                        <Router />
                    </RootWrapper>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;

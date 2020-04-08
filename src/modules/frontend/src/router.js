import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';

const Router = () => {
    return (
        <BrowserRouter>

            <Switch>
                <Route path={'/login'}>
                    <LoginPage />
                </Route>
                <Route path={'/'} exact>
                    <HomePage />
                </Route>
            </Switch>
        </BrowserRouter>
    )
};

export default Router;
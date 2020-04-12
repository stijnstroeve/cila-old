import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import PrivateRoute, {AntiPrivateRoute} from './PrivateRoute';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <AntiPrivateRoute path={'/login'}>
                    <LoginPage />
                </AntiPrivateRoute>
                <PrivateRoute path={'/'} exact>
                    <DashboardPage />
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    )
};

export default Router;
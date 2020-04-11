import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import PrivateRoute from './PrivateRoute';

const Router = () => {
    return (
        <BrowserRouter>

            <Switch>
                <Route path={'/login'}>
                    <LoginPage />
                </Route>
                <PrivateRoute path={'/'} exact>
                    <DashboardPage />
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    )
};

export default Router;
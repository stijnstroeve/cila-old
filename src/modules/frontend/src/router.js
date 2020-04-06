import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';

const Router = () => {
    return (
        <BrowserRouter>

            <Switch>
                <Route path={'/'} exact>
                    <HomePage />
                </Route>
            </Switch>
        </BrowserRouter>
    )
};

export default Router;
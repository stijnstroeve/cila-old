import React from 'react';
import {Redirect, Route} from 'react-router-dom';

/**
 * Route that redirects every unauthorized request back to /login
 * @param children
 * @param props
 * @returns {*}
 * @constructor
 */
const PrivateRoute = ({children, ...props}) => {
    return (
        <Route
            {...props}
            render={(renderProps) => {
                if(true) {//TODO Check authentication
                    return children;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: renderProps.location }
                            }}
                        />)
                }
            }}
        />
    )
};

export default PrivateRoute;
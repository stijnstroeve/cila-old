import React from 'react';
import {Redirect, Route} from 'react-router-dom';

/**
 * Route that redirects every unauthenticated request back to /login or the given redirect route
 * @param children
 * @param authenticated
 * @param redirect
 * @param props
 * @returns {*}
 * @constructor
 */
const ConditionalRoute = ({children, authenticated, redirect, ...props}) => {
    return (
        <Route
            {...props}
            render={(renderProps) => {
                if(authenticated) {
                    return children;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: redirect || '/login',
                                state: { from: renderProps.location }
                            }}
                        />)
                }
            }}
        />
    )
};

export default ConditionalRoute;
import React from 'react';
import {connect} from 'react-redux';
import {isAuthenticated} from '../services/auth/selector';
import ConditionalRoute from './ConditionalRoute';

const PrivateRoute = (props) => {
    return (
        <ConditionalRoute redirect={'/login'} {...props} />
    )
};

const _AntiPrivateRoute = ({authenticated, ...props}) => {
    return (
        <ConditionalRoute authenticated={!authenticated} redirect={'/'} {...props} />
    )
};

const mapStateToProps = (state) => {
    return {
        authenticated: isAuthenticated(state)
    }
};

export default connect(mapStateToProps)(PrivateRoute);
export const AntiPrivateRoute = connect(mapStateToProps)(_AntiPrivateRoute);
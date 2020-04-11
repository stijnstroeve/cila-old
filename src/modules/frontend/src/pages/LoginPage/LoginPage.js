import React, {useState} from 'react';
import {connect} from 'react-redux';
import {REQUEST_LOGIN} from '../../services/webRequests/actionTypes';
import {requestLoading} from '../../services/webRequests/selector';
import {loginUser} from '../../services/auth/actions';
import BackendService from '../../services/backend/BackendService';

const LoginPage = (props) => {
    const [email, setEmail] = useState('test');
    const [password, setPassword] = useState('test');

    const login = () => {
        // props.loginUser(email, password)
        new BackendService().sendRequest('post', ['test', 'test2'], 'requeset')
    };

    return (
        <div>
            <h1>Login page</h1>
            <input type={'email'} placeholder={'Email'} value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type={'password'} placeholder={'Password'} value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type={'button'} value={'Submit'} onClick={() => login()} />

            {props.isLoading && (
                <h1>Loading...</h1>
            )}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        isLoading: requestLoading(state.web, REQUEST_LOGIN)
    }
};

export default connect(mapStateToProps, {loginUser})(LoginPage);
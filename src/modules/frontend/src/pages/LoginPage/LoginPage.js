import React, {useState} from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        console.log(email, password);
    };

    return (
        <div>
            <h1>Login page</h1>
            <input type={'email'} placeholder={'Email'} value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type={'password'} placeholder={'Password'} value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type={'button'} value={'Submit'} onClick={() => login()} />
        </div>
    )
};

export default LoginPage;
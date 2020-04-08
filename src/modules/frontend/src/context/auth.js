import React, {createContext, useContext} from 'react';

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

export {AuthContext, useAuth};
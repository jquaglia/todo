import React, { useState, useEffect, useCallback } from 'react';
import jwt from 'jsonwebtoken';
import useAjax from '../../hooks/useAjax.js';
import cookie from 'react-cookies';

export const AuthContext = React.createContext();

const API_URL = 'https://api-js401.herokuapp.com';

function AuthProvider(props) {

  let [user, setUser] = useState({});
  let [token, setToken] = useState('');
  let [response, request] = useAjax();

  const _isValidUser = useCallback(token => {
    const validUser = jwt.decode(token);
    if (validUser) {
      if (validUser.username === user.username) return true;
    } else {
      return false;
    }
  }, [user]);

  useEffect(() => {
    // console.log(response);
    if (_isValidUser(response.token)) {
      setUser(response.user);
      setToken(response.token);
      cookie.save('auth', response.token);
    }
  }, [response, _isValidUser]);

  useEffect(() => {
    let token = cookie.load('auth');
    if (token) {
      setToken(token);
    }
  }, []);


  const login = (username, password) => {
    // basic authentication header options
    let options = {
      url: `${API_URL}/signin`,
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    };
    request(options);
  };

  const logout = () => {
    setUser({});
    setToken('');
    cookie.remove('auth');
  };

  return (
    // eslint-disable-next-line
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
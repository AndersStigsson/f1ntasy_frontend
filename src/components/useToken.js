import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = tokenString;
    return userToken
  };

  const [token, setLoginToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    setLoginToken(userToken);
  };

  return {
    token,
    setToken: saveToken
  }
}
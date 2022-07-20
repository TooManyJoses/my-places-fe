import { useEffect, useCallback, useRef, useState } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  let logoutTimer = useRef();

  const login = useCallback((userId, token, expirationDate) => {
    setToken(token);
    setUserId(userId);
    const tokenExpiration =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 120);
    setTokenExpirationDate(tokenExpiration);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId,
        token,
        tokenExpiration: tokenExpiration.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTokenTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer.current = setTimeout(logout, remainingTokenTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate, logout]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (
      userData &&
      userData.token &&
      new Date(userData.tokenExpiration) > new Date()
    ) {
      login(
        userData.userId,
        userData.token,
        new Date(userData.tokenExpiration)
      );
    }
  }, [login]);

  return { userId, token, login, logout };
};

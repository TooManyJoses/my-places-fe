import { useEffect, useState, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './shared/components/NavBar';
import Users from './users/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import NewPlace from './places/pages/NewPlace';
import Auth from './users/pages/Auth';
import { AuthContext } from './shared/context/auth.context';

let logoutTimer;

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

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
      logoutTimer = setTimeout(logout, remainingTokenTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout]);

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
  }, []);

  let routes;
  if (token) {
    routes = (
      <>
        <Route index element={<Users />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/:userId/places" exact element={<UserPlaces />} />
        <Route path="/places/:placeId" exact element={<UpdatePlace />} />
        <Route path="*" element={<Navigate to="/" />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route index element={<Users />} />
        <Route path="auth" element={<Auth />} />
        <Route path="/:userId/places" exact element={<UserPlaces />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </>
    );
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <Routes>
        <Route path="/" element={<NavBar />}>
          {routes}
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;

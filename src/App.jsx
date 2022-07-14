import { useState, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './shared/components/NavBar';
import Users from './users/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import NewPlace from './places/pages/NewPlace';
import Auth from './users/pages/Auth';
import { AuthContext } from './shared/context/auth.context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((userId) => {
    setIsLoggedIn(true);
    setUserId(userId)
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null)
  }, []);

  let routes;
  if (isLoggedIn) {
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
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      <Routes>
        <Route path="/" element={<NavBar />}>
          {routes}
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;

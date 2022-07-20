import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './shared/components/NavBar';
import Users from './users/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import NewPlace from './places/pages/NewPlace';
import Auth from './users/pages/Auth';
import { AuthContext } from './shared/context/auth.context';
import { useAuth } from './shared/hooks/auth-hook';

function App() {
  const { userId, token, login, logout } = useAuth();

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

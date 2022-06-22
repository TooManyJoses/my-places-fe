import { Routes, Route, Navigate } from 'react-router-dom';
import MainNavigation from './shared/components/NavBar/MainNavigation';
import Users from './users/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import NewPlace from './places/pages/NewPlace';

const Auth = () => {
  return <div>Auth Placeholder</div>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainNavigation />}>
        <Route index element={<Users />} />
        <Route path="auth" element={<Auth />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/:userId/places" exact element={<UserPlaces />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;

import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './shared/components/NavBar';
import Users from './users/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import NewPlace from './places/pages/NewPlace';

const Auth = () => {
  return <div>Auth Placeholder</div>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Users />} />
        <Route path="auth" element={<Auth />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/:userId/places" exact element={<UserPlaces />} />
        <Route path="/places/:placeId" exact element={<UpdatePlace />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;

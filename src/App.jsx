import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './shared/components/NavBar/NavBar';
import Users from './users/pages/Users';
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
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;

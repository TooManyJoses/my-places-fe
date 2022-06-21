import { Routes, Route } from 'react-router-dom';
import NavBar from './shared/components/NavBar/NavBar';
import Users from './users/pages/Users';

const Auth = () => {
  return <div>Auth Placeholder</div>
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Users />} />
        <Route path='auth' element={<Auth />} />
      </Route>
    </Routes>
  );
}

export default App;

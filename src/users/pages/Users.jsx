import { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5050/api/users/');
        if (!response.ok) {
          throw new Error(data.message);
        }
        const data = await response.json();
        setUsers(data.users);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleErrorModal = () => {
    setError(null);
    setIsLoading(false);
  };

  return (
    <>
      <ErrorModal error={error} onClear={handleErrorModal} />

      {isLoading && <LoadingSpinner asOverlay />}

      {!isLoading && <UsersList users={users} />}
    </>
  );
};

export default Users;

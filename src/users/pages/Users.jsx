import { useEffect, useState } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import UsersList from '../components/UsersList';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await sendRequest('http://localhost:5050/api/users/');
        setUsers(data.users);
      } catch (error) {}
    };
    fetchUsers();
  }, []);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />

      {isLoading && <LoadingSpinner asOverlay />}

      {!isLoading && <UsersList users={users} />}
    </>
  );
};

export default Users;

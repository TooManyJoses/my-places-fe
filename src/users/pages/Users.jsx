import UsersList from '../components/UsersList';
import MOCKUSERS from '../../mockData/mockUsers.json';

const Users = () => {
  return <UsersList users={MOCKUSERS} />;
};

export default Users;

import UserItem from './UserItem';
import Card from '../../shared/components/Card';
import './UsersList.styles.scss';

const UsersList = ({ users }) => {
  return (
    <div>
      {users.length === 0 ? (
        <div className="center">
          <Card>
            <h2>No Users Found</h2>
          </Card>
        </div>
      ) : (
        <ul className="users-list">
          {users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersList;

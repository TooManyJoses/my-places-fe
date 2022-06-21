import UserItem from './UserItem';
import './UsersList.styles.scss';

const UsersList = ({ users }) => {
  return (
    <div>
      {users.length === 0 ? (
        <div className="center">
          <h2>No Users Found</h2>
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

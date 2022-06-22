import { Link } from 'react-router-dom';
import Avatar from '../../shared/components/Avatar/Avatar';
import Card from '../../shared/components/Card/Card';
import './UsersItem.styles.scss';

const UserItem = ({ user }) => {
  const { id, name, image, placeCount } = user;

  return (
    <li className="user-item-container">
      <Card className="user-item-content">
        <Link to={`/${id}/places`}>
          <div className="user-item-image">
            <Avatar image={image} alt={name} />
          </div>
          <div className="user-item-info">
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
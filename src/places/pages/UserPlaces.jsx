import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';
import MOCKPLACES from '../../mockData/mockPlaces.json';
import './UserPlaces.styles.scss';

const UserPlaces = () => {
  const { userId } = useParams();
  const usersPlaces = MOCKPLACES.filter(place => place.creator === userId);

  return <PlaceList places={usersPlaces} />;
};

export default UserPlaces;

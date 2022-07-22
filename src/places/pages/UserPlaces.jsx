import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';
import PlaceList from '../components/PlaceList';
import './UserPlaces.styles.scss';

const UserPlaces = () => {
  const { userId } = useParams();
  const [userPlaces, setUserPlaces] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setUserPlaces(data.places);
      } catch (error) {}
    };
    fetchUserPlaces();
  }, [sendRequest, userId]);

  const onDeleteHandler = (deletedPlaceId) => {
    setUserPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading ? (
        <LoadingSpinner asOverlay />
      ) : (
        <PlaceList places={userPlaces} onDelete={onDeleteHandler} />
      )}
    </>
  );
};

export default UserPlaces;

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
          `http://localhost:5050/api/places/user/${userId}`
        );
        setUserPlaces(data.places);
      } catch (error) {}
    };
    fetchUserPlaces();
  }, [sendRequest, userId]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading ? (
        <LoadingSpinner asOverlay />
      ) : (
        <PlaceList places={userPlaces} />
      )}
    </>
  );
};

export default UserPlaces;

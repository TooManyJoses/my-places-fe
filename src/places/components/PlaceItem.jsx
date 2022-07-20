import { useState, useContext } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Button from '../../shared/components/Button/Button';
import Card from '../../shared/components/Card/Card';
import Map from '../../shared/components/Map/Map';
import Modal from '../../shared/components/Modal/Modal';
import { AuthContext } from '../../shared/context/auth.context';
import './PlaceItem.styles.scss';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal';

const PlaceItem = ({ placeInfo, onDelete }) => {
  const { id, image, title, description, address, creator, location } =
    placeInfo;

  const [showMap, setShowMap] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const handleShowMap = () => setShowMap((showState) => !showState);

  const handleShowDelete = () =>
    setShowDelete((showDeleteState) => !showDeleteState);

  const handleDeleteConfirmed = async () => {
    setShowDelete((showDeleteState) => !showDeleteState);
    try {
      await sendRequest(
        `http://localhost:5050/api/places/${id}`,
        'DELETE',
        null,
        { Authorization: 'Bearer ' + auth.token }
      );
      onDelete(id);
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={handleShowMap}
        header={address}
        contentClass="place-item-modal-content"
        footerClass="place-item-modal-actions"
        footer={
          <Button secondary onClick={handleShowMap}>
            CLOSE
          </Button>
        }
      >
        <div className="map-container">
          <Map center={location} zoom={16} />
        </div>
      </Modal>
      <Modal
        header="Are you sure?"
        show={showDelete}
        onCancel={handleShowDelete}
        contentClass="place-item-modal-content"
        footerClass="place-item-modal-actions"
        footer={
          <>
            <Button secondary onClick={handleShowDelete}>
              Cancel
            </Button>
            <Button danger onClick={handleDeleteConfirmed}>
              Delete
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place from your list of places?
          Once deleted all information will be lost.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item-container">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item-image">
            <img src={`http://localhost:5050/${image}`} alt={title} />
          </div>
          <div className="place-item-info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item-actions">
            <Button onClick={handleShowMap}>VIEW MAP</Button>
            {auth.userId === creator && (
              <Button inline to={`/places/${id}`}>
                EDIT
              </Button>
            )}
            {auth.userId === creator && (
              <Button inline onClick={handleShowDelete} danger>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;

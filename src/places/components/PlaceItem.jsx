import { useState } from 'react';
import Button from '../../shared/components/Button/Button';
import Card from '../../shared/components/Card/Card';
import Map from '../../shared/components/Map/Map';
import Modal from '../../shared/components/Modal/Modal';
import './PlaceItem.styles.scss';

const PlaceItem = ({ placeInfo }) => {
  const { id, imageUrl, title, description, address, creator, location } =
    placeInfo;

  const [showMap, setShowMap] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleShowMap = () => setShowMap(showState => !showState);

  const handleShowDelete = () => setShowDelete(showDeleteState => !showDeleteState);

  const handleDeleteConfirmed = () => alert('DELETING');

  return (
    <>
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
          <div className="place-item-image">
            <img src={imageUrl} alt={title} />
          </div>
          <div className="place-item-info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item-actions">
            <Button onClick={handleShowMap}>VIEW MAP</Button>
            <Button to={`/places/${id}`}>EDIT</Button>
            <Button onClick={handleShowDelete} danger>
              DELETE
            </Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;

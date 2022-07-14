import Button from '../../shared/components/Button/Button';
import Card from '../../shared/components/Card/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.styles.scss';

const PlaceList = ({ places, onDelete }) => {
  return places.length === 0 ? (
    <div className="place-list center">
        <Card>
          <h2>No places found.</h2>
          <Button to='/places/new'>ADD A PLACE</Button>
        </Card>
      </div>
  ) : (
    <ul className="place-list">
      {places.map((place) => (
        <PlaceItem key={place.id} placeInfo={place} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default PlaceList;

import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.styles.scss';

const PlaceList = ({ places }) => {
  return places.length === 0 ? (
    <div className="place-list center">
        <Card>
          <h2>No places found.</h2>
          <Button>ADD A PLACE</Button>
        </Card>
      </div>
  ) : (
    <ul className="place-list">
      {places.map((place) => (
        <PlaceItem key={place.id} placeInfo={place} />
      ))}
    </ul>
  );
};

export default PlaceList;

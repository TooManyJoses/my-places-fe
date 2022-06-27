import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MOCKPLACES from '../../mockData/mockPlaces.json';
import Card from '../../shared/components/Card/Card';
import Input from '../../shared/components/Input/Input';
import Button from '../../shared/components/Button/Button';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.styles.scss';

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { placeId } = useParams();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
    },
    false
  );

  const placeToUpdate = MOCKPLACES.find((place) => place.id === placeId);

  useEffect(() => {
    if (placeToUpdate) {
      setFormData(
        {
          title: { value: placeToUpdate.title, isValid: true },
          description: { value: placeToUpdate.description, isValid: true },
        },
        true
      );
    }
    setIsLoading(false);
  }, [placeToUpdate, setFormData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    // TODO: call to BE
  };

  if (!placeToUpdate) {
    return (
      <div className="center">
        <Card>
          <h2>Could Not Find Place</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="center">
          <Card>
            <h2>Loading...</h2>
          </Card>
        </div>
      ) : (
        <form className="place-form" onSubmit={handleSubmit}>
          <Input
            id="title"
            inputType="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValidity={formState.inputs.title.isValid}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValidity={formState.inputs.description.isValid}
          />
          <div className="place-form-action">
            <Button type="submit" disabled={!formState.isValid}>
              UPDATE PLACE
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;

import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth.context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal';
import Card from '../../shared/components/Card/Card';
import Input from '../../shared/components/Input/Input';
import Button from '../../shared/components/Button/Button';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/form-hook';

const UpdatePlace = () => {
  const { placeId } = useParams();
  const [placeToUpdate, setPlaceToUpdate] = useState([]);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
    },
    false
  );

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const data = await sendRequest(
          `http://localhost:5050/api/places/${placeId}`
        );
        setPlaceToUpdate(data.place);
        setFormData(
          {
            title: { value: data.place.title, isValid: true },
            description: { value: data.place.description, isValid: true },
          },
          true
        );
      } catch (error) {}
    };
    fetchUserPlaces();
  }, [sendRequest, setFormData, placeId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5050/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        { Authorization: 'Bearer ' + auth.token, 'Content-Type': 'application/json' }
      );
      navigate(`/${auth.userId}/places`);
    } catch (error) {}
  };

  if (!placeToUpdate && !error) {
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
      <ErrorModal error={error} onClear={clearError} />
      {isLoading ? (
        <div className="center">
          <Card>
            <LoadingSpinner />
          </Card>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
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
          <div className="form-action">
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

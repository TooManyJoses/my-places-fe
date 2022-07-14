import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth.context';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';
import Input from '../../shared/components/Input/Input';
import Button from '../../shared/components/Button/Button';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
      address: { value: '', isValid: false },
    },
    false
  );
  const navigate = useNavigate();
  const { error, isLoading, clearError, sendRequest } = useHttpClient();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        'http://localhost:5050/api/places',
        'POST',
        { 'Content-Type': 'application/json' },
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId,
        })
      );
      navigate(`/${auth.userId}/places`);
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="form" onSubmit={handleSubmit}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          inputType="input"
          type="text"
          label="Title"
          errorText="Please enter valid title."
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
        />
        <Input
          id="description"
          inputType="textArea"
          label="Description"
          errorText="Please enter valid description (at least 5 characters)."
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(5)]}
        />
        <Input
          id="address"
          inputType="input"
          label="Address"
          errorText="Please enter valid address."
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
        />
        <div className="form-action">
          <Button type="submit" disabled={!formState.isValid}>
            ADD PLACE
          </Button>
        </div>
      </form>
    </>
  );
};

export default NewPlace;

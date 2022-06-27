import Input from '../../shared/components/Input/Input';
import Button from '../../shared/components/Button/Button';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/form-hook';

const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
      address: { value: '', isValid: false },
    },
    false
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    // TODO: call to BE
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
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
  );
};

export default NewPlace;

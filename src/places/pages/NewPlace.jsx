import { useCallback, useReducer } from 'react';
import Input from '../../shared/components/Input/Input';
import Button from '../../shared/components/Button/Button';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';
import './NewPlace.styles.scss';

const initialFormState = {
  inputs: {
    title: { value: '', isValid: false },
    description: { value: '', isValid: false },
    address: { value: '', isValid: false },
  },
  isValid: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: 'INPUT_CHANGE', value, isValid, inputId: id });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    // TODO: call to BE
  };

  return (
    <form className="new-place-form" onSubmit={handleSubmit}>
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
        id="description"
        inputType="input"
        label="Address"
        errorText="Please enter valid address."
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE()]}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;

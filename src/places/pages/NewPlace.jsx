import { useCallback, useReducer } from 'react';
import Input from '../../shared/components/Input/Input';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';
import './NewPlace.styles.scss';

const initialFormState = {
  inputs: {
    title: { value: '', isValid: false },
    description: { value: '', isValid: false },
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

  return (
    <form className="new-place-form">
      <Input
        id="title"
        inputType="input"
        type="text"
        label="label"
        errorText="Please enter valid title."
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE()]}
      />
      <Input
        id="description"
        inputType="textArea"
        label="Description"
        errorText="Please enter valid description."
        onInput={inputHandler}
        validators={[VALIDATOR_MINLENGTH(5)]}
      />
    </form>
  );
};

export default NewPlace;

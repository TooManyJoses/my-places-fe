import Input from '../Input/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../utils/validators';

const LogInInputs = ({ inputHandler }) => {

  return (
    <>
      <Input
        id="email"
        inputType="input"
        type="text"
        label="E-mail"
        errorText="Please enter a valid email."
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
      />
      <Input
        id="password"
        inputType="input"
        type="password"
        label="Password"
        errorText="Please enter valid password (at least 5 characters)"
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
      />
    </>
  );
};

export default LogInInputs;

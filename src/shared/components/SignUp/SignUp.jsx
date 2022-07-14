import Input from '../Input/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../utils/validators';

const SignUpInputs = ({ inputHandler, formState }) => {
  return (
    <>
      <Input
        id="name"
        inputType="input"
        type="text"
        label="Name"
        errorText="Please enter a name"
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE()]}
      />
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
        errorText="Please enter valid password (at least 8 characters)"
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
      />
    </>
  );
};

export default SignUpInputs;

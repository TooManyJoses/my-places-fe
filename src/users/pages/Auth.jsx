import { useForm } from '../../shared/hooks/form-hook';
import Input from '../../shared/components/Input/Input';
import Button from '../../shared/components/Button/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators';
import './Auth.styles.scss';
import Card from '../../shared/components/Card/Card';

const Auth = () => {
  const [formState, inputHandler] = useForm(
    {
      email: { value: '', isValid: false },
      password: { value: '', isValid: false },
    },
    false
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    // TODO: call to BE
  };
  return (
    <Card className='auth-container' >
      <h2> Log In Required</h2>
      <hr />
    <form onSubmit={handleSubmit}>
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
        type="text"
        label="Password"
        errorText="Please enter valid password (at least 5 characters)"
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
      />
      <div className="form-action">
        <Button type="submit" disabled={!formState.isValid}>
          LOG IN
        </Button>
      </div>
    </form>
    </Card>
  );
};

export default Auth;

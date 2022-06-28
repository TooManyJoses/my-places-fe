import { useState } from 'react';
import { useForm } from '../../shared/hooks/form-hook';
import Button from '../../shared/components/Button/Button';
import Card from '../../shared/components/Card/Card';
import './Auth.styles.scss';
import LogInInputs from '../../shared/components/LogIn/LogIn';
import SignUpInputs from '../../shared/components/SignUp/SignUp';

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: '', isValid: false },
      password: { value: '', isValid: false },
    },
    false
  );

  const handleSwitchDisplay = () => {
    if (!showLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          confirmPassword: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: '', isValid: false },
        },
        false
      );
    }
    setShowLogin((showLoginState) => !showLoginState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    // TODO: call to BE
  };

  return (
    <Card className="auth-container">
      <h2> Log In</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        {showLogin ? (
          <LogInInputs inputHandler={inputHandler} />
        ) : (
          <SignUpInputs formState={formState} inputHandler={inputHandler} />
        )}
        <div className="form-action">
          <Button secondary type="submit" disabled={!formState.isValid}>
            {showLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </div>
      </form>
      <Button onClick={handleSwitchDisplay}>
        Show {showLogin ? 'Sign Up' : 'Log In'}
      </Button>
    </Card>
  );
};

export default Auth;

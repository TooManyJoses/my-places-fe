import { useState, useContext } from 'react';
import { AuthContext } from '../../shared/context/auth.context';
import { useForm } from '../../shared/hooks/form-hook';
import Button from '../../shared/components/Button/Button';
import Card from '../../shared/components/Card/Card';
import './Auth.styles.scss';
import LogInInputs from '../../shared/components/LogIn/LogIn';
import SignUpInputs from '../../shared/components/SignUp/SignUp';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal';

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const auth = useContext(AuthContext);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      let response;
      if (showLogin) {
        response = await fetch('http://localhost:5050/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
      } else {
        response = await fetch('http://localhost:5050/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
      }
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setIsLoading(false);
      auth.login();
    } catch (error) {
      setError(error.message || 'Something went wrong. Plese try again.');
    }
  };

  const handleErrorModal = () => {
    setError(null);
    setIsLoading(false);
  };

  return (
    <>
      <ErrorModal error={error} onClear={handleErrorModal} />
      <Card className="auth-container">
        {isLoading && <LoadingSpinner asOverlay />}
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
    </>
  );
};

export default Auth;

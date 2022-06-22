import { Link } from 'react-router-dom';

import './Button.styles.scss';

const Button = ({ href, secondary, danger, children, to, size, type, onClick, disabled, exact}) => {
  if (href) {
    return (
      <a
        className={`button button-${size || 'default'} ${secondary &&
          'button-secondary'} ${danger && 'button-danger'}`}
        href={href}
      >
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link
        to={to}
        exact={exact}
        className={`button button-${size || 'default'} ${secondary &&
          'button-secondary'} ${danger && 'button-danger'}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`button button-${size || 'default'} ${secondary &&
        'button-secondary'} ${danger && 'button-danger'}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

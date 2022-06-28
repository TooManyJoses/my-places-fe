import { Link } from 'react-router-dom';

import './Button.styles.scss';

const Button = ({ href, secondary, inline, danger, children, to, size, type, onClick, disabled, exact}) => {
  if (href) {
    return (
      <a
        className={`button button-${size || 'default'} ${secondary &&
          'button-secondary'} ${danger && 'button-danger'} ${inline && 'inline'}`}
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
          'button-secondary'} ${danger && 'button-danger'} ${inline && 'inline'}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`button button-${size || 'default'} ${secondary &&
        'button-secondary'} ${danger && 'button-danger'} ${inline && 'inline'}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

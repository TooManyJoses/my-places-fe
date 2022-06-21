import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../assets/DnD_Location.svg';
import './NavBar.styles.scss';

const NavBar = () => {
  return (
    <>
      <div className="nav-bar">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/auth">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;

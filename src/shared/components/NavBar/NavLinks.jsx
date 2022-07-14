import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import './NavLinks.styles.scss';

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" end>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {auth.isLoggedIn ? (
        <li>
          <NavLink to="/auth" onClick={auth.logout}>LOG OUT</NavLink>
        </li>
      ) : (
        <li>
          <NavLink to="/auth">LOG IN</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;

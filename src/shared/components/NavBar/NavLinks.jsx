import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import './NavLinks.styles.scss';

const NavLinks = () => {
  const auth = useContext(AuthContext);
  console.log('auth', auth)

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" end>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/places">MY PLACES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {auth.isLoggedIn ? (
        <li>
          <a onClick={auth.logout}>LOG OUT</a>
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

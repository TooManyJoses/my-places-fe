import { useState } from 'react';
import MainHeader from './MainHeader';
import { Link, Outlet } from 'react-router-dom';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import './index.styles.scss';
import Backdrop from '../Backdrop/Backdrop';

const NavBar = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={handleDrawer} />}
      <SideDrawer show={drawerIsOpen} onClick={handleDrawer}>
        <nav className="main-navigation-drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button className="main-navigation-menu-btn" onClick={handleDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation-title">
          <Link to="/">BoomBerry</Link>
        </h1>
        <nav className="main-navigation-header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
      <Outlet />
    </>
  );
};

export default NavBar;

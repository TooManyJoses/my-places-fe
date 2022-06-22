import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './SideDrawer.styles.scss';

const SideDrawer = ({ children, show, onClick }) => {
  const drawerContent = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={onClick}>{children}</aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(
    drawerContent,
    document.getElementById('drawer')
  );
};

export default SideDrawer;

import ReactDOM from 'react-dom';
import Backdrop from '../Backdrop/Backdrop';
import { CSSTransition } from 'react-transition-group';
import './Modal.styles.scss';

const ModalOverlay = ({
  className,
  style,
  headerClass,
  header,
  onSubmit,
  contentClass,
  children,
  footerClass,
  footer,
}) => {
  const modalContent = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal-header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form
        onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}
      ></form>
      <div className={`modal-content ${contentClass}`}>{children}</div>
      <footer className={`modal-footer ${footerClass}`}>{footer}</footer>
    </div>
  );
  return ReactDOM.createPortal(modalContent, document.getElementById('modal'));
};

const Modal = (props) => {
  const { show, onCancel } = props;
  return (
    <>
      {show && <Backdrop onCancel={onCancel} />}
      <CSSTransition
        in={show}
        timeout={200}
        classNames="modal"
        mountOnEnter
        unmountOnExit
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;

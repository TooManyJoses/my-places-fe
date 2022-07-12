import Modal from '../Modal/Modal';
import Button from '../Button/Button';

const ErrorModal = ({ onClear, error, header = 'An Error Occurred!' }) => {
  return (
    <Modal
      onCancel={onClear}
      header={header}
      show={!!error}
      footer={<Button onClick={onClear}>Okay</Button>}
    >
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;

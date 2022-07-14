import { useRef } from 'react';
import Button from '../Button/Button';
import './ImageUpload.modules.scss';

const ImageUpload = ({ id, center }) => {
  const fileSelectorRef = useRef();

  const imageSelectHandler = () => {
    fileSelectorRef.current.click();
  };

  const fileSelectedHandler = (event) => {
    console.log(event.target)
  }

  return (
      <div className="form-control">
        <input
          id={id}
          ref={fileSelectorRef}
          type="file"
          style={{ display: 'none' }}
          accept=".jpg, .png, .jpeg"
          onChange={fileSelectedHandler}
        />
      <div className={`${center && 'center'}`}>
        <div className="image-preview">
          <img src="" alt="preview" />
        </div>
        <Button type="button" onClick={imageSelectHandler}>
          Select Image
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;

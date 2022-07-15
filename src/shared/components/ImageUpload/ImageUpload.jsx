import { useEffect } from 'react';
import { useRef, useState } from 'react';
import Button from '../Button/Button';
import './ImageUpload.modules.scss';

const ImageUpload = ({ id, center, onInput, errorText }) => {
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [isValid, setIsValid] = useState(false);
  const fileSelectorRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImagePreview(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const imageSelectHandler = () => {
    fileSelectorRef.current.click();
  };

  const fileSelectedHandler = (event) => {
    const { files } = event.target;
    let uploadedFile;
    let fileIsValid;
    if (files && files.length !== 0) {
      uploadedFile = files[0];
      setFile(uploadedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, uploadedFile, fileIsValid);
  };

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
          {imagePreview ? (
            <img src={imagePreview} alt="preview" />
          ) : (
            <p>Please upload an image</p>
          )}
        </div>
        <Button type="button" onClick={imageSelectHandler}>
          Select Image
        </Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  );
};

export default ImageUpload;

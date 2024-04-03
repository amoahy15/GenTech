import React, { useState, useRef} from "react";
import styles from '../styles/popup.module.css'

const PopupForm = ({ onSubmit, onClose }) => {
  const [annotationText, setAnnotationText] = useState("");
  const [clickCoordinates, setClickCoordinates] = useState({ x: null, y: null });
  const imgref = useRef(null);

  const handleTextChange = (event) => {
    setAnnotationText(event.target.value);
  };

  const handleImageClick = (event) => {
    //limit to image: 
    const rect = imgref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setClickCoordinates({ x, y });
    console.log(`Clicked coordinates:(${x}, ${y})`);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Text:", annotationText, "Coordinates:", clickCoordinates);
    onSubmit(annotationText, clickCoordinates); //TODO: backend
    setAnnotationText("");
    onClose();
  };

  return (
    <div className={styles['popup-background']}>
      <div className={styles["popup-box"]} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div onClick={handleImageClick} style={{ position: 'relative', display: 'inline-block', cursor: 'crosshair' }}>
            <img ref={imgref} src="https://media.nga.gov/iiif/b4ee3d5d-4397-4e7e-b946-20a22c878230/full/!384,384/0/default.jpg" style={{ maxWidth: '100%'}}/>

            {/* unsure how to integrate this w the css folder :/*/}
            {clickCoordinates.x !== null && clickCoordinates.x >= 0 && clickCoordinates.y !== null && clickCoordinates.y >= 0 && (
            <span className={styles["annotation-icon]"]} style={{top: `${clickCoordinates.y}px`, left: `${clickCoordinates.x}px`, position: 'absolute',
            width: '10px',
            height: '10px',
            backgroundColor: 'red',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)'}}/>
            )}
        </div>
        <form onSubmit={handleFormSubmit}>
            <input className={styles["input"]} type="text" value={annotationText} onChange={handleTextChange} placeholder="Type your annotation here"/>
            <button className={styles["btn"]}type="submit">Add</button>
            <button className={styles["btn"]} type="button" onClick={onClose}>Cancel</button>
        </form>
        </div>

    </div>
  );
};

export default PopupForm;

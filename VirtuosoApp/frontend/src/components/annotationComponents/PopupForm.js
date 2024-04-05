import React, { useState, useRef, useEffect} from "react";
import styles from '../styles/popup.module.css'
import axios from "axios";
import { useHistory } from 'react-router-dom';

//TODO: Undo hardcoding of artworkid
const PopupForm = ({ onSubmit, onClose }) => {
  const [annotationText, setAnnotationText] = useState("");
  const [clickCoordinates, setClickCoordinates] = useState({ x: null, y: null });
  const imgref = useRef(null);
  const [userData, setUserData] = useState();
  const token = localStorage.getItem('token');
  const nav = useHistory();

  const handleTextChange = (event) => {
    const newText = event.target.value;    
    if (newText.length <= 500) { 
      setAnnotationText(newText);
    } else {
      console.error("The annotation text is too long.");
    }
  };

  //to be sent
  const handleImageClick = (event) => {
    const rect = imgref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setClickCoordinates({ x, y });
    console.log(`Clicked coordinates: (${x}, ${y})`);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/user/details', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserData({
          user_id: response.data.user_id,
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!userData) {
      console.error("Not logged in");
      nav.push("/login");
      return;
    }
    const payload = {
      artworkID: "20cc4d78-a17c-49b9-8e7c-5b32cb57d7a3",
      message: annotationText,
      x_coordinate: String(clickCoordinates.x),
      y_coordinate: String(clickCoordinates.y),
    };
    try {
      await axios.post(
        "http://127.0.0.1:5000/api/annotations/annotation",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Successful submission");
      onSubmit(); //the submit/fetch function in fetchannotate.js
    } catch (error) {
      console.error("Error during submission:", error);
    }
    setAnnotationText("");
    onClose();
  };

  return (
    <div className={styles['popup-background']}>
      <div className={styles["popup-box"]} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div onClick={handleImageClick} style={{ position: 'relative', display: 'inline-block', cursor: 'crosshair' }}>
            <img ref={imgref} src="https://media.nga.gov/iiif/b4ee3d5d-4397-4e7e-b946-20a22c878230/full/!384,384/0/default.jpg" style={{ maxWidth: '100%'}}/>

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

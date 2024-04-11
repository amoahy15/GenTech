import React, { useState, useRef, useEffect} from "react";
import styles from '../styles/popup.module.css'
import axios from "axios";
import { useHistory } from 'react-router-dom';

//TODO: Undo hardcoding of artworkid
const PopupForm = ({ onSubmit, onClose, url }) => {
  const [annotationText, setAnnotationText] = useState("");
  const [clickCoordinates, setClickCoordinates] = useState({ x: null, y: null });
  const [realclickCoordinates, setrealClickCoordinates] = useState({ x: null, y: null });
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

  const handleImageClick = (event) => {
    const rect = imgref.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setClickCoordinates({ x, y }); 
    setrealClickCoordinates({ x, y }); //now storing as %
    console.log(`Clicked coordinates: (${x}%, ${y}%)`);
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
      artworkID: "ddb2cbad-e00c-43fc-b317-41ad1148efdc",
      message: annotationText,
      x_coordinate: String(realclickCoordinates.x),
      y_coordinate: String(realclickCoordinates.y),
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
            <img ref={imgref} src={url} style={{ maxWidth: '100%'}}/>
            {
            realclickCoordinates.x !== null && realclickCoordinates.x >= 0 &&
            realclickCoordinates.y !== null && realclickCoordinates.y >= 0 && (
              //todo: refactoring here
              <span className={styles["annotation-icon"]} style={{top: `${realclickCoordinates.y}%`, left: `${realclickCoordinates.x}%`, position: 'absolute', transform: 'translate(-50%, -50%)'
              }}/>
            )
          }
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

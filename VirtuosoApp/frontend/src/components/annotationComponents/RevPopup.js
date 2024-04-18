import React, { useState, useRef, useEffect} from "react";
import styles from '../styles/popup.module.css'
import axios from "axios";
import { useHistory } from 'react-router-dom';
import StarRating from './stars'
import { useParams } from "react-router-dom";

//TODO: Undo hardcoding of artworkid
const RevPopup = ({ onSubmit, onClose, artworkID}) => {
  const [annotationText, setAnnotationText] = useState("");
  const imgref = useRef(null);
  const [userData, setUserData] = useState();
  const token = localStorage.getItem('token');
  const nav = useHistory();
  const [rating, setRating] = useState(0);

  const handleTextChange = (event) => {
    const newText = event.target.value;    
    if (newText.length <= 500) { 
      setAnnotationText(newText);
    } else {
      console.error("The annotation text is too long.");
    }
  };


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/details', {
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
  }, [artworkID]);

  
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!userData) {
      console.error("Not logged in");
      nav.push("/login2");
      return;
    }
    
    const payload = {
      artwork_id: artworkID,
      rating: parseFloat(rating),
      comment: annotationText,
    };
    console.log(artworkID);
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/review/create_review",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Successful submission");
      onSubmit();
    } catch (error) {
      console.error("Error during submission:", error);
    }
    setAnnotationText("");
    setRating(0);
    onClose();
  };


  return (
    <div className={styles['popup-background']}>
      <div className={styles["popup-box"]} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div>
        <StarRating onRatingChange={(newRating) => setRating(newRating)} />


        </div>
        <form onSubmit={handleFormSubmit}>
            <input className={styles["input"]} type="text" value={annotationText} onChange={handleTextChange} placeholder="Type your review here"/>
            <button className={styles["btn"]} style={{alignItems: 'right'}}type="submit">Add</button>
            <button className={styles["btn"]} type="button" onClick={onClose}>Cancel</button>
        </form>
        </div>

    </div>
  );
};

export default RevPopup;

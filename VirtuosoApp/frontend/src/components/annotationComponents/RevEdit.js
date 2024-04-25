import React, { useState, useEffect } from "react";
import styles from '../styles/popup.module.css'
import axios from "axios";
import StarRating from './stars'
import { useHistory } from 'react-router-dom';

const RevEdit = ({ onSubmit, onClose, handleSubmit, reviewId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const nav = useHistory();

  useEffect(() => {
    if (reviewId) {
      const fetchReviewData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/review/reviews/${reviewId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setComment(response.data.comment);
          setRating(response.data.rating);
          console.log("initial rating: ", response.data.rating, comment, reviewId)
        } catch (error) {
          console.error('Error fetching review details:', error);
        }
      };

      fetchReviewData();
    }
  }, [reviewId]);

  const handleTextChange = (event) => {
    const newText = event.target.value;
    if (newText.length <= 500) {
      setComment(newText);
    } else {
      console.error("The review text is too long.");
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!localStorage.getItem('token')) {
      console.error("Not logged in");
      nav.push("/login");
      return;
    }
    const payload = {
      rating: rating,
      comment: comment,
    };
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/review/reviews/${reviewId}`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log("Review update successful");
      handleSubmit();
      onSubmit();
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      onClose(); 
    }
  };

  return (
    <div className={styles['popup-background']}>
      <div className={styles["popup-box"]} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div>
          <StarRating rating={Math.round(rating)} onRatingChange={setRating}/>
        </div>
        <form onSubmit={handleFormSubmit}>
          <textarea className={styles.input} value={comment} onChange={handleTextChange} placeholder="Type your review here"/>
          <div className={styles.buttonGroup}>
            <button className={styles.btn} type="submit">Update Review</button>
            <button className={styles.btn} type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RevEdit;

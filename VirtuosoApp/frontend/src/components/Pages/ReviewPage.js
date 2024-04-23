
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ArtTextCols from "../annotationComponents/ImageTextColumn";
import Carousel from '../carouselcomponents/Carousel.js';
import Review from "../annotationComponents/Review.js";
import axios from 'axios';
import styles from '../styles/reviews.module.css'
import Help from '../annotationComponents/Help.js';

function ReviewPage(props) {
  const [reviews, setReviews] = useState([]);
  const { artworkID } = props.match.params;
  const [userHasReviewed, setUserHasReviewed] = useState(false);
  const [userReviewId, setUserReviewId] = useState(null);
  const nav = useHistory();
  const [showHelp, setShowHelp] = useState(false);
  const toggleHelp = () => setShowHelp(!showHelp);


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token){
      nav.push("/login");
    } else {
      
      fetchReviews();
    }
  }, [artworkID, nav]);
  
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/review/artwork/${artworkID}/reviews`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setReviews(response.data.reviews);
      setUserHasReviewed(response.data.user_has_reviewed);
      setUserReviewId(response.data.user_review_id);
      console.log(userHasReviewed)
    } catch (error) {
      console.error('Error fetching reviews:', error);
      nav.push('/login')
    }
  };
  
  const deleteReview = async (reviewId) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/review/reviews/${reviewId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.status === 200) {
            console.log("Review deleted successfully");
            fetchReviews();
        }
    } catch (error) {
        console.error("Failed to delete review", error.response.data);
    }
};


const handleLike = async (reviewId) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/review/${reviewId}/like`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    fetchReviews();
    console.log('Like toggle was successful:', response.data);
  } catch (error) {
    console.error('Error liking the review:', error.response);
  }
};


  const handleReviewSubmitted = () => {
    fetchReviews();
  };

  return (
    <div>
      <div style={{marginTop: '2vh'}}>
        <ArtTextCols artworkID={artworkID} handleSubmit={handleReviewSubmitted} userHasReviewed={userHasReviewed} userReviewId={userReviewId}/>
        <h1 style={{margin: '50px'}}>REVIEWS</h1>
        <Review onDel={deleteReview} reviews={reviews} handleLike={handleLike} />
        <h1 style={{margin: '50px'}}>EXPLORE</h1>
      </div>
      <div style={{paddingBottom: '50px', padding: '10px 8vw'}}>
        <Carousel category={"painting"} />
      </div>
      <button className={styles["help-button"]} onClick={toggleHelp}>?</button>
      {showHelp && (
        <Help onClose={toggleHelp}/>
      )}
    </div>
  );
}

export default ReviewPage;
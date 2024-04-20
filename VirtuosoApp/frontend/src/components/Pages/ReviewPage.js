import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ArtTextCols from "../annotationComponents/ImageTextColumn";
import Carousel from '../carouselcomponents/Carousel.js'
import axios from 'axios';
import Review from "../annotationComponents/Review.js";

function ReviewPage(props) {
  const [reviews, setReviews] = useState([]);
  const { artworkID } = props.match.params;

  
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
}

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/review/artwork/${artworkID}/reviews`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      }
    });
      const reviewsData = response.data.map(review => ({
        rating: review.rating,
        user_name: review.user_name,
        review: review.comment,
        revid: review.review_id,
        is_owner: review.is_owner
      }));
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [artworkID]);

  const handleReviewSubmitted = () => {
    fetchReviews();
  };

  return (
  <div>
    <div>
        <div>
            
        </div>
          <div>
            <ArtTextCols artworkID={artworkID} handleSubmit = {handleReviewSubmitted}></ArtTextCols>
            <h1 style={{margin: '50px'}}>REVIEWS</h1>
            <Review onDel={deleteReview} reviews={reviews} ></Review>
            <h1 style={{margin: '50px'}}>MORE LIKE THIS</h1>
            
        </div>
          
      </div>

        <div style={{paddingBottom: '50px', padding: '10px 8vw'}}>
          <Carousel category={"painting"}></Carousel>
        </div>
  </div>
  );
}

export default ReviewPage;
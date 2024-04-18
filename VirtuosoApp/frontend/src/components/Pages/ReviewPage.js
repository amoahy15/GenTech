import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ArtTextCols from "../annotationComponents/ImageTextColumn";
import Carousel from '../carouselcomponents/Carousel.js'
import axios from 'axios';
import Review from "../annotationComponents/Review.js";

function ReviewPage(props) {
  const [reviews, setReviews] = useState([]);
  const { artworkID } = props.match.params;

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/review/artwork/${artworkID}/reviews`); 
      const reviewsData = response.data.map(review => ({
        rating: review.rating,
        user_name: review.user_name,
        review: review.comment
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
            <Review reviews={reviews}></Review>
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
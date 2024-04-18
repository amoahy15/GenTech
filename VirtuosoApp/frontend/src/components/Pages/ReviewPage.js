import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ArtTextCols from "../annotationComponents/ImageTextColumn";
import Carousel from '../carouselcomponents/Carousel.js'
import axios from 'axios';
import Review from "../annotationComponents/Review.js";

function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const { artworkId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/review/artwork/${artworkId}/reviews`); 
        const reviewsData = response.data;
        console.log(reviewsData);

        const formattedReviews = reviewsData.map(review => ({
          rating: review.rating,
          user: review.userID,
          review: review.comment
        }));
        setReviews(formattedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
  
    fetchReviews();
  }, []);



  return (
  <div>
    <div>
        <div>
            
        </div>
          <div>
            <ArtTextCols text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}></ArtTextCols>
            <h1 style={{margin: '50px'}}>REVIEWS</h1>
            <Review reviews={reviews}></Review>
            <h1 style={{margin: '50px'}}>TRENDING</h1>
            
        </div>
          
      </div>

        <div style={{paddingBottom: '50px', padding: '10px 5vw'}}>
          <Carousel category={"paintings"}></Carousel>
        </div>
  </div>
  );
}

export default ReviewPage;
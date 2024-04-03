import React, { useState, useEffect } from 'react';

import ArtTextCols from "../annotationComponents/ImageTextColumn";
import Carousel from '../carouselcomponents/Carousel.js'
import img from '../../assets/images/Frida_Kahlo/Frida_Kahlo_10.jpg'
import img2 from '../../assets/images/Frida_Kahlo/Frida_Kahlo_11.jpg'
import img3 from '../../assets/images/Frida_Kahlo/Frida_Kahlo_12.jpg'
import axios from 'axios';
import img4 from '../../assets/images/Frida_Kahlo/Frida_Kahlo_13.jpg'
import img5 from '../../assets/images/Frida_Kahlo/Frida_Kahlo_14.jpg'
import Review from "../annotationComponents/Review.js";

function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewid = "23a";
        const response = await axios.get("http://127.0.0.1:5000/api/reviews/" + reviewid); 
        const backendReviews = response.data;
        const formattedReviews = backendReviews.map(review => ({
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
          <Carousel images={[img, img2, img3, img4, img5]}></Carousel>
        </div>
  </div>
  );
}

export default ReviewPage;
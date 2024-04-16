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
        const response = await axios.get("http://127.0.0.1:8000/api/review/artwork/20cc4d78-a17c-49b9-8e7c-5b32cb57d7a3",); 
        const thisdata = response.data;

        const formattedReviews = thisdata.map(review => ({
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
          <Carousel category={"Impressionism"}></Carousel>
        </div>
  </div>
  );
}

export default ReviewPage;
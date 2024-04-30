import React, {useEffect, useState} from 'react';
import styles from '../styles/reviews.module.css';
import ReviewCard from './ReviewCard';
import {jwtDecode} from "jwt-decode";
import axios from 'axios';



const Review = ({ reviews, onDel, isLiked, handleLike}) => {
  const token = localStorage.getItem('token');
  const [userId, setUserData] = useState();

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserData(decodedToken.userId);
    }
  }, [token]);

  if (!reviews || reviews.length === 0) {
    return <div style={{marginLeft: '5vw'}}>Start the conversation!</div>;
  }

  const rows = (reviewsArray, chunkSize) => {
    const rows = [];
    for (let i = 0; i < reviewsArray.length; i += chunkSize) {
      //formatting
      rows.push(reviewsArray.slice(i, i + chunkSize));
    }
    return rows;
  };

  const reviewRows = rows(reviews, 2);

  return (
    <div style={{ marginLeft: '5vw', marginRight: '5vw' }}>
      <div className={styles['review-container']}>
        
        {reviewRows.map((row, index) => (
          <div key={index} className={styles['row']}>
            {row.map((review, reviewIndex) => (
              <ReviewCard
                key={reviewIndex}
                rating={review.rating}
                user={review.user_name}
                review={review.comment}
                revid = {review.review_id}
                is_owner={review.is_owner}
                onDelete = {onDel}
                isLiked={review.liked_status}
                likes = {review.like_count}
                onLike={()=> handleLike(review.review_id)}
              />
            ))}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Review;

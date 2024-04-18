import React, {useEffect, useState} from 'react';
import styles from '../styles/reviews.module.css';
import ReviewCard from './ReviewCard';
import {jwtDecode} from "jwt-decode";
import axios from 'axios';

const Review = ({ reviews, onDel }) => {
  const token = localStorage.getItem('token');
  const [userId, setUserData] = useState();

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserData(decodedToken.userId);
    }
  }, [token]);

  const currentUserReviewIndex = reviews.findIndex(review => review.user_id === userId);

  let userHasReview = false;
  let currentUserReview;
  if (currentUserReviewIndex !== -1) {
    userHasReview = true;
    [currentUserReview] = reviews.splice(currentUserReviewIndex, 1);
    reviews.unshift(currentUserReview);
  }


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

  const deleteReview = async (reviewId) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/review/reviews/${reviewId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.status === 200) {
            console.log("Review deleted successfully");
            window.location.reload();
        }
    } catch (error) {
        console.error("Failed to delete review", error.response.data);
    }
}

  return (
    <div style={{ marginLeft: '5vw', marginRight: '5vw' }}>
      <div className={styles['review-container']}>
        {!userHasReview && (
          <div>
            <button >+</button>
          </div>
        )}
        {reviewRows.map((row, index) => (
          <div key={index} className={styles['row']}>
            {row.map((review, reviewIndex) => (
              <ReviewCard
                key={reviewIndex}
                rating={review.rating}
                user={review.user_name}
                review={review.review}
                revid = {review.revid}
                is_owner={review.is_owner}
                onDelete = {onDel}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;

import React from 'react';
import styles from '../styles/reviews.module.css';
import ReviewCard from './ReviewCard';
import jwt_decode from "jwt-decode";

const Review = ({ reviews }) => {
  const token = localStorage.getItem('token');
  const userId = token.userId;
  const currentUserReviewIndex = reviews.findIndex(review => review.user_id === userId);

//TODO: pin user ratings/reviews  to later edit
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
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;


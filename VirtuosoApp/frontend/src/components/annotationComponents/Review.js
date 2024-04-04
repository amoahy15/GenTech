import React from 'react';
import styles from '../styles/reviews.module.css';
import ReviewCard from './ReviewCard';

const Review = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <div style={{marginLeft: '5vw'}}>Start the conversation!</div>;
  }

  const rows = (reviewsArray, chunkSize) => {
    const rows = [];
    for (let i = 0; i < reviewsArray.length; i += chunkSize) {
      rows.push(reviewsArray.slice(i, i + chunkSize));
    }
    return rows;
  };

  //better way to do this?
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
                user={review.user}
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


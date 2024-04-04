import React from 'react';
import styles from '../styles/reviews.module.css';
import StaticStarRating from './staticstars';
//todo: add more to be passed in
const ReviewCard = ({ rating, user, review }) => {
  return (
    <div className={styles['review-card']}>
      <StaticStarRating rating={rating}/>
      <p style={{fontSize: '20px', paddingBottom: '5px'}}>{user}</p>
      <p style={{overflow: 'default'}}>{review}</p>
    </div>
  );
};

export default ReviewCard;
import React from 'react';
import styles from '../styles/reviews.module.css';
import StaticStarRating from './staticstars';
import { FaTrashAlt } from 'react-icons/fa';

//todo: add more to be passed in
const ReviewCard = ({ rating, user, review, revid, is_owner, onDelete }) => {
  console.log(revid)
  return (
    <div className={styles['review-card']}>
      <StaticStarRating rating={rating}/>
      <p style={{fontSize: '20px', paddingBottom: '5px'}}>{user}</p>
      <p style={{overflow: 'default'}}>{review}</p>
      {is_owner && (
          <button onClick={() => onDelete(revid)} className={styles['delete-button']}>
            <FaTrashAlt />
          </button>
        )}
    </div>
  );
};

export default ReviewCard;
import React from 'react';
import styles from '../styles/reviews.module.css';
import StaticStarRating from './staticstars';
import { FaTrashAlt, FaHeart} from 'react-icons/fa';

//This component displays a single review card & controls conditional components
const ReviewCard = ({ rating, user, review, revid, is_owner, onDelete, onLike, isLiked}) => {
  //todo likes
  
  return (
    <div className={styles['review-card']}>
      <StaticStarRating rating={rating}/>
      <p style={{fontSize: '20px', paddingBottom: '5px'}}>{user}</p>
      <p style={{overflow: 'default'}}>{review}</p>
      <div className={styles['actions']}>
        <button onClick={() => onLike(revid)} className={styles['like-button']}>
          <FaHeart style={{cursor: 'pointer', fontSize: '14px', color: isLiked ? 'red' : 'gray' }} />
        </button>
        {is_owner && (
          <button onClick={() => onDelete(revid)} className={styles['delete-button']}>
            <FaTrashAlt style={{cursor: 'pointer', fontSize: '14px', color: 'gray' }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;



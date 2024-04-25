import React from 'react';
import styles from '../styles/reviews.module.css';
import StaticStarRating from './staticstars';
import { FaTrashAlt, FaHeart} from 'react-icons/fa';

//This component displays a single review card & controls conditional components
const ReviewCard = ({ rating, likes, user, review, revid, is_owner, onDelete, onLike, isLiked}) => {
  return (
    <div className={styles['review-card']}>
      <StaticStarRating rating={rating}/>
      <a href= "/review/:reviewId" style={{fontSize: '20px', paddingBottom: '5px'}}>{user}</a>
      <p style={{overflow: 'default'}}>{review}</p>
      <div className={styles['actions']}>
        <button onClick={() => onLike(revid)} className={styles['like-button']}>
          <FaHeart style={{cursor: 'pointer', fontSize: '14px', color: isLiked ? 'red' : 'gray' }} />
          <span style={{ marginLeft: '5px', fontSize: '14px' }}>{likes}</span>
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



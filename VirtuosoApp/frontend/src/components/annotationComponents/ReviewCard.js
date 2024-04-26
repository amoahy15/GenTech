import React from 'react';
import styles from '../styles/reviews.module.css';
import StaticStarRating from './staticstars';
import { FaTrashAlt, FaHeart} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import linkstyle from '../styles/annotation.module.css'
//This component displays a single review card & controls conditional components
const ReviewCard = ({ rating, likes, user, review, revid, is_owner, onDelete, onLike, isLiked}) => {
  return (
    <div className={styles['review-card']}>
      <StaticStarRating rating={rating}/>
      <Link className={linkstyle['link']} to={`/profiles/${user}`}><p style={{fontSize: '20px', paddingBottom: '5px'}}>{user}</p></Link>
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



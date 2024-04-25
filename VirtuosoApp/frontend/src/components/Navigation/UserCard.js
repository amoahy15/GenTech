import React from "react";
import styles from "../styles/usercard.module.css"
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
    console.log(user)
    return (
      <div className={styles.userCard}>
        <Link to={`/profiles/${user.name}`}><img src={user.imageurl} className={styles['profilePhoto']} /></Link>
        <div className={styles.userName}><Link to={`/profiles/${user.name}`}>{user.name}</Link></div>
        <p>{user.profilePictureUrl}</p>
      </div>
    );
  };
export default UserCard;
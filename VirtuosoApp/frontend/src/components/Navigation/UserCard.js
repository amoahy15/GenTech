import React from "react";
import styles from "../styles/usercard.module.css"

const UserCard = ({ user }) => {
    console.log(user)
    return (
      <div className={styles.userCard}>
        <img src={user.imageurl} className={styles['profilePhoto']} />
        <div className={styles.userName}>{user.name}</div>
        <p>{user.profilePictureUrl}</p>
      </div>
    );
  };
export default UserCard;
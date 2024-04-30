import React from "react";
import styles from "../styles/usercard.module.css"
import { useHistory } from 'react-router-dom';


const UserCard = ({ user }) => {

    const history = useHistory();
    const onclick = () => {
        history.push(`/profiles/${user.name}`);
        window.location.reload();
    };
    return (
      <div className={styles.userCard} onClick={onclick}>
        <img src={user.imageurl} className={styles['profilePhoto']} />
        <div className={styles.userName}>{user.name}</div>
        <p>{user.profilePictureUrl}</p>
      </div>
    );
  };
export default UserCard;
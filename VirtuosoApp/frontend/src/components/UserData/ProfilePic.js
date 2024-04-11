import React from 'react'
import profilephoto from '../../assets/images/Frida_Kahlo/Frida_Kahlo_3.jpg';
import styles from '../styles/profilepic.module.css'

const ProfilePic = () => {
  return (
    <div className={styles.profilephoto}>
    <img src={profilephoto} alt="Profile" />
    </div>
  )
}

export default ProfilePic

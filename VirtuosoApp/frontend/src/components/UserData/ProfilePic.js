import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/profilepic.module.css';

const ProfilePic = () => {
  const [userData, setUserData] = useState({ user_id: '', bio: '', profile_picture: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/details`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`  
          }
        });
        setUserData({
          user_id: response.data.user_id,
          bio: response.data.bio,
          profile_picture: response.data.profile_picture
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);


  
  return (
    <div className={styles.profilephoto}>
      {userData.profile_picture && <img src={userData.profile_picture} alt="Profile" />}
    </div>
  );
}

export default ProfilePic;


import React, { useState, useEffect } from 'react';
import styles from '../styles/profilepic.module.css'
import axios from 'axios';



const ProfilePic = ({ category }) => {
  const [artworks, setArtworks] = useState([]);
  
  
  useEffect(() => {
    const fetchArtwork = async () => {
      if (category) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/artwork/tags/${category}`);
          setArtworks(response.data.artworks || []);
        } catch (error) {
          console.error(`Error fetching artworks with tag ${category}:`, error);
        }
      }
    };

    fetchArtwork();
  }, [category]);


  return (
    <div className={styles.profilephoto}>
    <img alt="Profile" />
    </div>
  )
}

export default ProfilePic

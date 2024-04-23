
import React, { useState, useEffect } from 'react';
import styles from '../styles/profilepic.module.css'
import axios from 'axios';



const ProfilePic = ({ category }) => {
  const [artworks, setArtworks] = useState([]);
  
  
  useEffect(() => {
    const fetchArtwork = async () => {
      if (category) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/artwork/tags/${category}`);
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

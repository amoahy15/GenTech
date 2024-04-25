import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/profilepic.module.css';

const ProfilePic = ({ category }) => {
  const [artworks, setArtworks] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchArtworks = async () => {
      if (category) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/artwork/tags/${category}`);
          const artworks = response.data.artworks || [];
          setArtworks(artworks);
          if (artworks.length > 0) {
            const randomIndex = Math.floor(Math.random() * artworks.length);
            setImageUrl(artworks[randomIndex].image_url);
          } else {
            setImageUrl(''); 
          }
        } catch (error) {
          console.error(`Error fetching artworks with tag ${category}:`, error);
          setImageUrl(''); 
        }
      }
    };

    fetchArtworks();
  }, [category]);

  
  return (
    <div className={styles.profilephoto}>
      <img src={imageUrl} alt={imageUrl ? "Profile artwork" : "No profile artwork available"} />
    </div>
  );
}

export default ProfilePic;

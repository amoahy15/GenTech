import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/popup.module.css'

function Post() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/s3/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      return response.data.url; 
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image. Please check the console for more details.');
      throw error; 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadImage();
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/artwork/create_artwork`, {
        title,
        artist,
        year,
        description,
        image_url: imageUrl,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Artwork uploaded successfully!');
    } catch (error) {
      console.error('Error creating artwork:', error);
      alert('Failed to create artwork. Please check the console for more details.');
    }
  };

  const [isOpen, setIsOpen] = useState(true);

  
  function onClose() {
    setIsOpen(false); 
  }

  if (!isOpen) {
    return null; 
  }
  
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" />
      <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist" />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="file" onChange={handleFileChange} />
      <button className={styles.btn} type="button" onClick={onClose}>Upload</button>
      <button className={styles.btn} type="button" onClick={onClose}>Cancel</button>
    </form>
  );
}

export default Post;

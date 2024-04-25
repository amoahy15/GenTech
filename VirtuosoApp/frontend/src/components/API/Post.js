import React, { useState } from 'react';
import axios from 'axios';

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
      const response = await axios.post(`http://127.0.0.1:8000/api/s3/upload`, formData, {
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
      await axios.post(`http://127.0.0.1:8000/api/artwork/create_artwork`, {
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
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" />
      <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist" />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload Artwork</button>
    </form>
  );
}

export default Post;

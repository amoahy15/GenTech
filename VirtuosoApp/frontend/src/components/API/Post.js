import React, { useState } from 'react';
import axios from 'axios';

function Post() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await axios.post('http://127.0.0.1:5000/api/s3/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
    return response.data.url; // The URL of the uploaded image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImage();
    await axios.post('http://127.0.0.1:5000/api/artwork/create_artwork', {
      title,
      year,
      image_url: imageUrl,
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    // Reset the form or redirect the user
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload Artwork</button>
    </form>
  );
}

export default Post;

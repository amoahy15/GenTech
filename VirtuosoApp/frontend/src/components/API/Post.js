import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/profilepopup.module.css'


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
      togglePopup();
      window.location.reload();
    } catch (error) {
      console.error('Error creating artwork:', error);
      alert('Failed to create artwork. You are not an authorized user.');
    }
  };

  const [popup, setPopup] = useState(false);

  const togglePopup = () =>{
      setPopup(!popup)
  }


  
  
  
  
  
  return (
    <div>
    <div style={{ display: 'flex', justifyContent: 'center'}}>
    <button style ={{marginBottom: '1vh'}}
    onClick = {togglePopup}
    className={styles.btn2}
    >
    For Verified Users Only
    </button>
    </div>

    {popup && (<div className={styles.background}>
        <div className={styles.box}>
            
            <form onSubmit={handleSubmit}>
                <p className={styles.bio}>This will not work if you do not have authourized access.</p>
                <p className={styles.bio}>Email us at <a href={`mailto:gentech.emory@gmail.com`}>gentech.emory@gmail.com</a> to request access.</p>
                <p className={styles.bio}>Please provide the following in your request: user ID and a portfolio of your art. Thanks!</p>
                <input className={styles.input} type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <input className={styles.input} type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" />
                <input className={styles.input} type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist" />
                <input className={styles.input} type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <input className={styles.btn2} type="file" onChange={handleFileChange} />
                <div className={styles.group}>
                <button className={styles.btn} type ="submit" >Upload Artwork</button>
                <button className={styles.btn} onClick={togglePopup}>Close</button>
                </div>
            </form>
        </div>
    </div>)}

    

    </div> 
    
  );
}

export default Post;

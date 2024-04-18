import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ArtworkDisplay() {
  const [artwork, setArtwork] = useState(null);
  const [error, setError] = useState('');
  const { artworkID } = useParams();  

  useEffect(() => {
    const fetchArtwork = async () => {
      console.log('Fetching artwork with ID:', artworkID);  
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/artwork/get_artwork/${artworkID}`);
        console.log('Received data:', response.data);  
        setArtwork(response.data);
      } catch (err) {
        console.error('Error fetching artwork:', err);  
        if (err.response && err.response.data) {
          setError(err.response.data.error);
        } else {
          setError('Failed to fetch artwork');
        }
      }
    };

    fetchArtwork();
}, [artworkID]);  

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!artwork) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <h2>{artwork.title}</h2>
      <p>{artwork.year}</p>
      <img src={artwork.image_url} alt={artwork.title} style={{ maxWidth: '100%', maxHeight: '500px' }} />
      {artwork.description && <p>{artwork.description}</p>}
    </div>
  );
}

export default ArtworkDisplay;


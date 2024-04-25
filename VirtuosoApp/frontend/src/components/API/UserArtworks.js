import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UserArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/artwork/user_artwork`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });

        setArtworks(response.data);
      } catch (error) {
        console.error('Fetching error:', error);
        setError(`Failed to fetch artworks: ${error.response ? error.response.data.error : error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworks();
  }, []); 

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {artworks.length > 0 ? (
        <div>
          <h2>User Artworks</h2>
          <ul>
            {artworks.map((artwork, index) => (
              <li key={index}>
                <img src={artwork.imageUrl} alt={artwork.title} style={{ width: '100px', height: 'auto' }} />
                <p>{artwork.title}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No artworks found.</p>
      )}
    </div>
  );
};

export default UserArtworks;

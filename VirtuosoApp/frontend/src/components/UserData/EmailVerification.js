import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VirtuosoLogo from "../../assets/images/VirtuosoLogo.png";

function VerificationPage() {
  const [status, setStatus] = useState('Verifying...');
  const [error, setError] = useState(null); 
  const { userId, verificationToken } = useParams();

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/user/verify/${userId}/${verificationToken}`;
    axios.get(apiUrl)
      .then(response => {
        if (response.data.verified) {
          setStatus('Your account has been successfully verified!');
        } else {
          setStatus('Verification failed.');
          setError(response.data.message);
        }
      })
      .catch(error => {
        setStatus('Verification failed.');
        setError(`Error: ${error.response?.data?.error || 'Unknown error occurred'}`);  // Set error from API response or a default error message
      });
  }, [userId, verificationToken]);

  return (
    <div style={{ textAlign: 'center', backgroundColor: 'white', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <img src={VirtuosoLogo} alt="Virtuoso Logo" style={{ maxWidth: '150px', marginBottom: '20px' }} />
      <h1>{status}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default VerificationPage;

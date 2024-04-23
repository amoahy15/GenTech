import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import VirtuosoLogo from "../../assets/images/VirtuosoLogo.png";

function VerificationPage() {
  const [status, setStatus] = useState('Verifying...');
  const [error, setError] = useState(null);
  const { userId, verificationToken } = useParams();
  const history = useHistory();

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/user/verify/${userId}/${verificationToken}`;
    axios.get(apiUrl)
      .then(response => {
        if (response.data.verified) {
          setStatus('Your account has been successfully verified!');
          setTimeout(() => {
            history.push('/login2');
          }, 3000);
        } else {
          setStatus('Verification failed.');
          setError(response.data.message);
        }
      })
      .catch(error => {
        setStatus('Verification failed.');
        setError(`Error: ${error.response?.data?.error || 'Unknown error occurred'}`);  
      });
  }, [userId, verificationToken, history]);

  return (
    <div style={{ textAlign: 'center', backgroundColor: 'white', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <img src={VirtuosoLogo} alt="Virtuoso Logo" style={{ maxWidth: '150px', marginBottom: '20px' }} />
      <h1>{status}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default VerificationPage;

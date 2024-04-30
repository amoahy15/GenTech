import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Row from '../Navigation/rowScroll';
import Collections from './Collections';
import styles from '../styles/profilepopup.module.css'

const OtherUser = () => {
  
  const [userData, setUserData] = useState({ user_id: '', bio: '', profile_picture: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { username } = useParams();  
  console.log(username)
  const history = useHistory();

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found!");
      history.push('/login'); // Redirect to login if no token
      window.location.reload();
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/details/${username}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`  
          }
        });
        setUserData({
          user_id: response.data.user_id,
          bio: response.data.bio,
          profile_picture: response.data.profile_picture
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      

    <div style={{marginTop: '7vh',display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <div className={styles.pic}>
    {userData.profile_picture && <img src={userData.profile_picture} alt="Profile" />}
    </div>
    </div>

    <div style={{marginTop: '2vh',display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <div className={styles.user}>
    {username}
    </div>
    </div>
      

    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <div style={{flex: 2, maxWidth: '50%', border: '1px solid #cccccc', borderRadius: '10px', marginTop: '7vh', marginBottom: '15vh', padding: '10px', maxHeight: '600px', overflow: 'auto' }}>
    <h1 style ={{marginLeft: '3vh', marginBottom: '1vh'}} className={styles.h1}>Bio:</h1>
    <div style={{marginLeft:'2vh',marginRight: '2vh',flex: 2, maxWidth: '100%', border: '1px solid #cccccc', borderRadius: '10px', padding: '10px', maxHeight: '500px', overflow: 'auto' }}>
    <div className={styles.bio} style ={{marginTop:'2vh'}}><p>{userData.bio}</p></div>
    </div>
    </div>
    </div>
     

      <Row title="Recently Rated">
          <div style={{paddingBottom: '50px', padding: '40px 8vw'}}>
            <Collections category={userData.user_id} />
          </div>   
        </Row>

    </div>
  );
};

export default OtherUser;


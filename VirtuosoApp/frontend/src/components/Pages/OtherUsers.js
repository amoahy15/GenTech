import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Row from '../Navigation/rowScroll';
import Collections from './Collections';

const OtherUser = () => {
  const [userData, setUserData] = useState({ user_id: '', bio: '', profile_picture: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { username } = useParams();  
  console.log(username)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/details/${username}`, {
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
      <h1>User Profile</h1>
      {/*{userData.profile_picture && <img src={userData.profile_picture} alt="Profile" />}*/}
      <p><strong>Username:</strong> {username}</p>
      <p><strong>User ID:</strong> {userData.user_id}</p>
      <p><strong>Bio:</strong> {userData.bio}</p>

      <Row title="Recently Rated">
          <div style={{paddingBottom: '50px', padding: '40px 8vw'}}>
            <Collections category={userData.user_id} />
          </div>   
        </Row>

    </div>
  );
};

export default OtherUser;


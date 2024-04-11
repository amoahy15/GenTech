import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/profile.modules.css';
import Carousel from '../carouselcomponents/Carousel.js';
import profilephoto from '../../assets/images/Frida_Kahlo/Frida_Kahlo_3.jpg';
import background from '../../assets/images/Gustav_Klimt/Gustav_Klimt_2.jpg';
import img from '../../assets/images/testImage.jpeg';
import img2 from '../../assets/images/testImage2.jpeg';
import img3 from '../../assets/images/testImage3.jpeg';
import EditUser from '../UserData/EditUser.js';
import EditItem from '../UserData/EditItem.js';



function Profile() {
  const [userData, setUserData] = useState({
    user_name: 'Loading...',
    bio: 'Loading bio...',
    followers_count: 0, 
    following_count: 0, 
  });
  const [bioText, setBioText] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/user/details', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserData({
          user_name: response.data.user_name, 
          bio: response.data.bio,
          followers_count: response.data.followers_count, // Set followers_count
          following_count: response.data.following_count, // Set following_count
        });
        setBioText(response.data.bio);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []); 

  const handleBioChange = event => {
    setBioText(event.target.value);
  };

  const handleUpdateBio = async () => {
    try {
      const response = await axios.put(
        'http://127.0.0.1:5000/api/user/bio',
        { bio: bioText },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setUserData(prevState => ({
        ...prevState,
        user_name: response.data.user_name, 
        bio: response.data.bio,
        followers_count: response.data.followers_count, // Update followers_count
        following_count: response.data.following_count, // Update following_count
      }));
      setBioText('');
    } catch (error) {
      console.error('Error updating bio:', error);
    }
  };

  return (
    <div>
      <div className="header">
        <img src={background} alt="Background" style={{ minWidth: '100%', height: '300px', objectFit: 'cover' }} />
      </div>

      <div className="profile-container">
        <div className="profile-photo">
          <img src={profilephoto} alt="Profile" />
        </div>
        <div className="profile-details" style={{ alignItems: 'baseline' }}>
          <div style={{ fontSize: '30px', paddingTop: '17px' }}>{userData.user_name}</div>
          <button className="username-button">Follow</button>
          <div style={{ paddingTop: '10px' }}>
            <span>{`Followers: ${userData.followers_count}`}</span>
            <span style={{ paddingLeft: '15px' }}>{`Following: ${userData.following_count}`}</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '60px' }}>
        <div className="card-container">
          <div className="card">
            <h2 style={{ fontSize: '20px' }}>BIO</h2>
            <h3 style={{ fontSize: '15px', paddingTop: '5px' }}>
              {userData.bio}
            </h3>

            <div className='textEntry'>
              <input 
                type="text" 
                value={bioText} 
                onChange={handleBioChange} 
                placeholder="Edit your bio"
              />
               <button onClick={handleUpdateBio}>Save</button>
          </div>
          </div>
          <div className="long-card">
            <h2 style={{ fontSize: '20px' }}>UPDATES</h2>
          </div>
        </div>
      </div>

      <div style={{paddingBottom: '50px', padding: '10px 5vw'}}>
       <Carousel category="trending" />
      </div>
      
    </div>
  );
}

export default Profile;

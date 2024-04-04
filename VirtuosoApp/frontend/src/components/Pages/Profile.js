import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure Axios is installed or use fetch as an alternative
import '../styles/profile.modules.css';
import Carousel from '../carouselcomponents/Carousel.js'
import profilephoto from '../../assets/images/Frida_Kahlo/Frida_Kahlo_3.jpg';
import background from '../../assets/images/Gustav_Klimt/Gustav_Klimt_2.jpg';
import img from '../../assets/images/testImage.jpeg'
import img2 from '../../assets/images/testImage2.jpeg'
import img3 from '../../assets/images/testImage3.jpeg'

function Profile() {
  // State to hold user data
  const [userData, setUserData] = useState({
    username: 'Loading...', 
    bio:'Loading...'
  });
  const [bioText, setBioText] = useState('');

  useEffect(() => {
    // Fetch user details from the backend
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/user/details', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Using the token from localStorage
          },
        });
        setUserData({
          username: response.data.username,
          bio: response.data.bio,
        });
        setBioText(response.data.bio);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array means this effect runs once on mount

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
   // Update user data and reset the bio text being edited
   setUserData(prevState => ({
    ...prevState,
    bio: response.data.bio,
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
          <div style={{ fontSize: '30px', paddingTop: '17px' }}>{userData.username}</div>
          <button className="username-button">0 Followers</button>
          <button className="username-button">0 Following</button>
        </div>
      </div>

      <div style={{ marginTop: '60px' }}>
        <div className="card-container">
          <div className="card">
            <h2 style={{ fontSize: '20px' }}>BIO</h2>
            <h3 style={{ fontSize: '15px', paddingTop: '5px' }}>
              {userData.bio}
            </h3>

            <div className= 'textEntry'>
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
          {<Carousel images={[img, img2, img3]}></Carousel>}
      </div>
      
    </div>
  );
}

export default Profile;

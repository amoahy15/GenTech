import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/profile.modules.css';
import profilephoto from '../../assets/images/Frida_Kahlo/Frida_Kahlo_3.jpg';
import background from '../../assets/images/Gustav_Klimt/Gustav_Klimt_2.jpg';

function Profile() {
  // State to hold user data
  const [userData, setUserData] = useState({
    user_name: 'Loading...', // Default username
    bio: 'Loading bio...', // Default bio
  });

  useEffect(() => {
    // Fetch user details from the backend
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/user/details', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Using the token from localStorage
          },
        });
        // Adjusted to match the backend response
        setUserData({
          user_name: response.data.user_name, // Corrected to use 'user_name'
          bio: response.data.bio,
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array means this effect runs once on mount

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
          {/* Updated to reflect the corrected state property name */}
          <div style={{ fontSize: '30px', paddingTop: '17px' }}>{userData.user_name}</div>
          <button className="username-button">Follow</button>
        </div>
      </div>

      <div style={{ marginTop: '60px' }}>
        <div className="card-container">
          <div className="card">
            <h2 style={{ fontSize: '20px' }}>BIO</h2>
            <h3 style={{ fontSize: '15px', paddingTop: '5px' }}>
              {userData.bio}
            </h3>
          </div>
          <div className="long-card">
            <h2 style={{ fontSize: '20px' }}>UPDATES</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

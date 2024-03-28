// import React from 'react';
// import '../styles/profile.modules.css';
// import profilephoto from '../../assets/images/Frida_Kahlo/Frida_Kahlo_3.jpg'; 
// import background from '../../assets/images/Gustav_Klimt/Gustav_Klimt_2.jpg'; 

// function Profile() {
//   return (
//     <div>
//       <div className="header">
//         <img src={background} style={{ minWidth: '100%', height: '300px', objectFit: 'cover' }} />
//       </div>

//       <div className="profile-container">
//         <div className="profile-photo">
//           <img src={profilephoto} alt="Profile Photo" />
//         </div>
//         <div className="profile-details" style={{alignItems: 'baseline'}}>
//           <div style={{fontSize: '30px', paddingTop: '17px'}}>@user1</div>
//           <button className="username-button">Follow</button>
//         </div>
//       </div>

//     <div style={{marginTop: '60px'}}>
//     <div className="card-container">
//         <div className="card">
//           <h2 style={{fontSize: '20px'}}>BIO</h2>
//           <h3 style={{fontSize: '15px', paddingTop: '5px'}}>
//             Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut"
//           </h3>
//         </div>
//         <div className="long-card">
//             <h2 style={{fontSize: '20px'}}>UPDATES</h2>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default Profile;
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure Axios is installed or use fetch as an alternative
import '../styles/profile.modules.css';
import profilephoto from '../../assets/images/Frida_Kahlo/Frida_Kahlo_3.jpg';
import background from '../../assets/images/Gustav_Klimt/Gustav_Klimt_2.jpg';

function Profile() {
  // State to hold user data
  const [userData, setUserData] = useState({
    username: 'Loading...', // Default username
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
        setUserData({
          username: response.data.username,
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
          <div style={{ fontSize: '30px', paddingTop: '17px' }}>{userData.username}</div>
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

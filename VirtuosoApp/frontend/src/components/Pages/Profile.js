import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Collections from './Collections.js';
import Row from '../Navigation/rowScroll.js';
import Post from '../API/Post.js';
import styles from '../styles/profilepopup.module.css'
import ProfilePic from '../UserData/ProfilePic.js';


function Profile() {


  const [userData, setUserData] = useState({
    email: '',
    id: '',
    user_name: 'Loading...',
    bio: 'Loading bio...',
    followers_count: 0, 
    following_count: 0, 
  });
  const [bioText, setBioText] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/details`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('API Response:', response.data);
        setUserData({
          email: response.data.email,
          id: response.data.user_id,
          user_name: response.data.user_name, 
          bio: response.data.bio,
          followers_count: response.data.followers_count,
          following_count: response.data.following_count,
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
    if (!userData.id) {
      alert('User ID is undefined. Please ensure you are logged in and try again.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const url = `${process.env.REACT_APP_API_BASE_URL}/user/update_bio`;
  
      const response = await axios.put(
        url,
        { bio: bioText },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      setUserData(prevState => ({
        ...prevState,
        bio: response.bioText,
      }));
  
      alert('Bio updated successfully!');
    } catch (error) {
      console.error('Error updating bio:', error.response ? error.response.data : error);
      alert('Failed to update bio. Please try again.');
      console.log(userData.id);
    }
  };

    const [popup, setPopup] = useState(false);

    const togglePopup = () =>{
        setPopup(!popup)
    }

    function handleSave() {
      handleUpdateBio();
      togglePopup();
      window.location.reload();
    }

  

  return (
    <div>
    <div style={{marginTop: '7vh',display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <div className={styles.pic}>
    <ProfilePic/>
    </div>
    </div>

    <div style={{marginTop: '2vh',display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <div className={styles.user}>
    {userData.user_name}
    </div>
    </div>
    
   
    
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
   
    <div style={{flex: 2, maxWidth: '50%', border: '1px solid #cccccc', borderRadius: '10px', marginTop: '7vh', marginBottom: '15vh', padding: '10px', maxHeight: '600px', overflow: 'auto' }}>
    <h1 style ={{marginLeft: '3vh', marginBottom: '1vh'}} className={styles.h1}>Bio:</h1>
    <div style={{marginLeft:'2vh',marginRight: '2vh',flex: 2, maxWidth: '100%', border: '1px solid #cccccc', borderRadius: '10px', padding: '10px', maxHeight: '500px', overflow: 'auto' }}>
    <div className={styles.bio} style ={{marginTop:'2vh'}}><p>{userData.bio}</p></div>
    </div>
    
      
    
    <div style={{ display: 'flex', justifyContent: 'center'}}>
    <button style ={{marginBottom: '2vh', marginTop: '2vh'}}
    onClick = {togglePopup}
    className={styles.btn2}
    >
    Edit Bio
    </button>
    </div>
   
    {popup && (<div>
        <div className={styles.background}>
        <div className={styles.box}>
              <input className={styles.input}
                type="text" 
                value={bioText} 
                onChange={handleBioChange} 
                placeholder="Edit your bio"
              />
              <div className={styles.group}>
               <button className={styles.btn} onClick={handleSave}>Save</button>
               <button className={styles.btn} onClick={togglePopup}>Close</button>
              </div>
          </div>
          </div>
        </div>)}
      
      
      


          <div>
          <Post/>
          </div>
          </div>
          </div>

          
         
    
      
      

      <Row title="Recently Rated">
          <div style={{paddingBottom: '50px', padding: '40px 8vw'}}>
            <Collections category={userData.id} />
          </div>   
        </Row>

        <Row title="My Art">
          <div style={{paddingBottom: '50px', padding: '40px 8vw'}}>
            <Collections category={userData.email} />
          </div>   
        </Row>

    </div>
  );
}

export default Profile;

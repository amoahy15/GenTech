import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from '../carouselcomponents/Carousel.js';
import profilephoto from '../../assets/images/Frida_Kahlo/Frida_Kahlo_3.jpg';
import background from '../../assets/images/Gustav_Klimt/Gustav_Klimt_2.jpg';
import img from '../../assets/images/testImage.jpeg';
import img2 from '../../assets/images/testImage2.jpeg';
import img3 from '../../assets/images/testImage3.jpeg';
import EditUser from '../UserData/EditUser.js';
import EditItem from '../UserData/EditItem.js';
import styles from '../styles/user.module.css';
import Collections from './Collections.js';
import Row from '../Navigation/rowScroll.js';
import Post from '../API/Post.js';

function Profile() {


  const [userData, setUserData] = useState({
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
        const response = await axios.get('http://127.0.0.1:8000/api/user/details', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserData({
          id: response.data.user_id,
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
    if (!userData.id) {
      alert('User ID is undefined. Please ensure you are logged in and try again.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const url = `http://localhost:8000/api/update_user/${userData.id}`;
  
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
  

  return (
    <div>
    <div className={styles.info}>
     <div className={styles.container}>
        <div className={styles.info}>
        <div style = {{paddingRight: '2vh', fontSize: '20px'}}>{userData.user_name}</div>
        <div>
          <EditItem><EditUser/></EditItem>
        </div>
        </div>
        <div>{userData.bio}</div>
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

      <div className={styles.container}>
        <div>Updates</div>
        <div>
          <Post/>
        </div>
      </div>  
    </div>


        <div>
          <Row title ='Trending'>
            <Collections category='trending'/>
          </Row>
        </div>

    </div>
  );
}

export default Profile;

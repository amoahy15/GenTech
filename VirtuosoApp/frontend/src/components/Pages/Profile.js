import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditUser from '../UserData/EditUser.js';
import EditItem from '../UserData/EditItem.js';
import Collections from './Collections.js';
import Row from '../Navigation/rowScroll.js';
import Post from '../API/Post.js';


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

  const [isOpen, setIsOpen] = useState(true);

  
  function onClose() {
    setIsOpen(false); 
  }

  if (!isOpen) {
    return null; 
  }

  return (
    <div>
    <div style = {{paddingRight: '2vh', fontSize: '20px'}}>{userData.user_name}</div>
    <div>{userData.bio}</div>
      <div>
        <div className='textEntry'>
              <input 
                type="text" 
                value={bioText} 
                onChange={handleBioChange} 
                placeholder="Edit your bio"
              />
               <button onClick={handleUpdateBio}>Save</button>
               <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      


          <div>
          <Post/>
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

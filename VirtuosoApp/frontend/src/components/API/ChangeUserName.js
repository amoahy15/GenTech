import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChangeUserName = () => {

    const [userData, setUserData] = useState({
        id: '',
        user_name: 'Loading...',
      });
      const [userName, setUserName] = useState('');
    
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
            });
            setUserName(response.data.user_name);
          } catch (error) {
            console.error('Error fetching user details:', error);
          }
        };
    
        fetchUserDetails();
      }, []); 
    
      const handleUserChange = event => {
        setUserName(event.target.value);
      };
    
      const handleUpdateUser = async () => {
        if (!userData.id) {
          alert('User ID is undefined. Please ensure you are logged in and try again.');
          return;
        }
      
        try {
          const token = localStorage.getItem('token');
          const url = `http://localhost:8000/api/update_user/${userData.id}`;
      
          const response = await axios.put(
            url,
            { user_name: userName },
            {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            }
          );
      
          setUserData(prevState => ({
            ...prevState,
            user_name: response.userName,
          }));
      
          alert('Username updated successfully!');
        } catch (error) {
          console.error('Error updating username:', error.response ? error.response.data : error);
          alert('Failed to update username. Please try again.');
          console.log(userData.id);
        }
      };

  return (
    <div>
        <div className='textEntry'>
              <input 
                type="text" 
                value={userName} 
                onChange={handleUserChange} 
                placeholder="change username"
              />
               <button onClick={handleUpdateUser}>Save</button>
        </div>
    </div>
    
  );

}

export default ChangeUserName

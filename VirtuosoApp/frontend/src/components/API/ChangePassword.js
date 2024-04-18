import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {

    const [userData, setUserData] = useState({
        id: '',
      });
      const [password, setPassword] = useState('');
    
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
              pwd: response.data.password_hash, 
            });
            setPassword(response.data.password_hash);
          } catch (error) {
            console.error('Error fetching user details:', error);
          }
        };
    
        fetchUserDetails();
      }, []); 
    
      const handlePWDChange = event => {
        setPassword(event.target.value);
      };
    
      const handleUpdatePWD = async () => {
        if (!userData.id) {
          alert('User ID is undefined. Please ensure you are logged in and try again.');
          return;
        }
      
        try {
          const token = localStorage.getItem('token');
          const url = `http://localhost:5000/api/update_user`;
      
          const response = await axios.put(
            url,
            { pwd: password },
            {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            }
          );
      
          setUserData(prevState => ({
            ...prevState,
            pwd: response.password,
          }));
      
          alert('Password updated successfully!');
        } catch (error) {
          console.error('Error updating password:', error.response ? error.response.data : error);
          alert('Failed to update password. Please try again.');
          console.log(userData.id);
        }
      };

  return (
    <div>
        <div className='textEntry'>
              <input 
                type="text" 
                value={password} 
                onChange={handlePWDChange} 
                placeholder="change password"
              />
               <button onClick={handleUpdatePWD}>Save</button>
        </div>
    </div>
    
  );

}

export default ChangePassword


import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/profilepopup.module.css'

function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log('Token used:', token); 

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/user/update_password`, {
        old_password: oldPassword,
        new_password: newPassword
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert(`Password updated successfully: ${response.data.message}`);
    } catch (error) {
      alert(`Error updating password: ${error.response ? error.response.data.error : 'An error occurred'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className={styles.h1}>
          Old Password:
          <input className={styles.input2}
            type="password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            placeholder="Enter your old password"
          />
        </label>
      </div>
      <div>
        <label className={styles.h1}>
          New Password:
          <input className={styles.input2}
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Enter your new password"
          />
        </label>
      </div>
      <button style ={{marginTop: '1vh'}} className = {styles.btn2} type="submit">Update Password</button>
    </form>
  );
  
}

export default UpdatePassword;

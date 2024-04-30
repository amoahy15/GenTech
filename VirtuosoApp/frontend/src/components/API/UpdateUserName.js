import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/profilepopup.module.css'

function UpdateUsername() {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/user/update_user`, {
        user_name: username
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert(`Username updated successfully: ${response.data.message}`);
    } catch (error) {
      alert(`Error updating username: ${error.response.data.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input className={styles.input2}
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="New Username"
      />
      <button style ={{marginTop: '1vh'}} className = {styles.btn2} type="submit">Update Username</button>
    </form>
  );
}

export default UpdateUsername;

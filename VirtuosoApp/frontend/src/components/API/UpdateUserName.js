import React, { useState } from 'react';
import axios from 'axios';

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
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="New Username"
      />
      <button type="submit">Update Username</button>
    </form>
  );
}

export default UpdateUsername;

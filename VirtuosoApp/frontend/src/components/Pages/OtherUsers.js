import React from 'react';
import { useParams } from 'react-router-dom';

const OtherUsers = () => {
  const { username } = useParams(); 

  return (
    <div>
      <p>Username: {username}</p>
    </div>
  );
};

export default OtherUsers;

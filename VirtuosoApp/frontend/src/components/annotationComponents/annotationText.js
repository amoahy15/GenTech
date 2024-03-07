import React from 'react';
import '../styles/annotation.module.css'

 {/* One single comment */} 
const SingleAnnotation = ({ username, comment}) => {
  return (
    <div className="single-annotation" style={{ marginBottom: '20px' }}>
      <p style={{color: 'gray'}}><b>{username}</b></p>
      <p style={{paddingBottom: '8px'}}>{comment}</p>
      <hr></hr>
    </div>
  );
};

export default SingleAnnotation;

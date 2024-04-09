import React from 'react';
import '../styles/annotation.module.css'

 {/* One single comment */} 
  {/* todo: likes hover*/} 
const SingleAnnotation = ({ username, comment, x, y, onHover}) => {
  return (
    <div className="single-annotation" style={{ marginBottom: '20px' }} onMouseEnter={() => onHover({ x, y })} onMouseLeave={() => onHover({ x: null, y: null })}>
      <p style={{color: 'gray'}}><b>{username}</b></p>
      <p style={{paddingBottom: '8px'}}>{comment}</p>
      {/*<p style={{paddingBottom: '8px'}}>{[x, " ", y]}</p>*/}
      {/*<p style={{paddingBottom: '8px'}}>{["^", likes]}</p>*/}
      <hr></hr>
    </div>
  );
};

export default SingleAnnotation;

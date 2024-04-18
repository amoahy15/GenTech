import React from 'react';
import '../styles/annotation.module.css'
import { FaTrashAlt } from "react-icons/fa"

 {/* One single comment */} 
  {/* todo: likes hover*/} 

const SingleAnnotation = ({ onDelete, username, comment, x, y, onHover, annotation}) => {
  console.log(annotation); 
  return (
    <div className="single-annotation" style={{ marginBottom: '20px' }} onMouseEnter={() => onHover({ x, y })} onMouseLeave={() => onHover({ x: null, y: null })}>
      <p style={{color: 'gray'}}><b>{username}</b></p>
      <p style={{paddingBottom: '8px'}}>{comment}</p>
      {/*<p style={{paddingBottom: '8px'}}>{[x, " ", y]}</p>*/}
      {/*<p style={{paddingBottom: '8px'}}>{["^", likes]}</p>*/}
      {annotation.is_owner && (
        <FaTrashAlt onClick={() => onDelete(annotation.annotation_id)} style={{ cursor: 'pointer' }} />
      )}
      <hr></hr>
    </div>
  );
};

export default SingleAnnotation;

import React, { useState } from 'react';
import placeholderImage from '../../assets/images/art5.webp';

const ImageWithMap = ({ onClick }) => {
  const handleAreaClick = () => {
    onClick(); // Invoke the onClick handler provided by the parent component
  };

  return (
    <div style={{ position: 'relative' }}>
      <img
        src={placeholderImage}
        alt="Image"
        useMap="#image-map"
        style={{ minWidth: '100%', maxWidth: '100%', height: 'auto', objectFit: 'cover' }}
      />
      <map name="image-map">
        <area shape="rect" coords="0,0,100,100" onClick={handleAreaClick} />
        {/* Define other clickable areas as needed */}
      </map>
    </div>
  );
};

export default ImageWithMap;


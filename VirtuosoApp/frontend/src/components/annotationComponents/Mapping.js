import React, { useState } from 'react';
import placeholderImage from '../../assets/images/art5.webp';

const ImageWithMap = ({ onClick }) => {
  const handleAreaClick = () => {
    onClick();
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
      </map>
    </div>
  );
};

export default ImageWithMap;


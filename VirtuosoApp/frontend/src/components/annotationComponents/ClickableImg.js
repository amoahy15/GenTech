import React, { useState } from 'react';

 {/*Just the image, click handled in ImageTextColumn since it relates to other components*/} 

const ImageDisplay = ({ imageUrl, onClick }) => (
  <div style={{ width: '100%' }} onClick={onClick}>
    <img src={imageUrl} alt="Image" style={{ minWidth: '100%', maxWidth: '100%', height: 'auto', maxHeight: '600px', objectFit: 'cover' }}
    />
  </div>
);

export default ImageDisplay;
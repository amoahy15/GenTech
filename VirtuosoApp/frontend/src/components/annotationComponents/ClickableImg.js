import React from "react";

const ImageDisplay = ({ imageUrl, onClick, allowDotPlacement, clickCoordinates }) => {
  const renderDot = () => {
    if (allowDotPlacement && clickCoordinates.x !== null && clickCoordinates.y !== null) {
      // Check if the image element exists
      const image = document.getElementById("image-display");
      if (!image) return null;
  
      // Calculate the position of the dot relative to the image dimensions
      const imageRect = image.getBoundingClientRect();
      const dotX = (clickCoordinates.x / imageRect.width) * 100; // Convert to percentage
      const dotY = (clickCoordinates.y / imageRect.height) * 100; // Convert to percentage
  
      console.log(`Red dot coordinates: (${clickCoordinates.x}, ${clickCoordinates.y})`);
  
      // Apply the calculated position using inline styles
      return (
        <div style={{ position: 'absolute', top: `${dotY}%`, left: `${dotX}%`, transform: 'translate(-50%, -50%)', width: 6, height: 6, backgroundColor: 'red', borderRadius: '50%' }}></div>
      );
    }
    return null;
  };
  

  return (
    <div id="image-display" style={{ position: 'relative', width: '100%' }} onClick={onClick}>
      <img src={imageUrl} alt="Image" style={{ minWidth: '100%', maxWidth: '100%', height: 'auto', maxHeight: '600px', objectFit: 'cover' }} />
      {renderDot()}
    </div>
  );
};

export default ImageDisplay;

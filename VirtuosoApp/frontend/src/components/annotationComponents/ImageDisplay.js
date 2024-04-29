import React from "react";

const ImageDisplay = ({imageUrl, allowDotPlacement, hoverCoordinates}) => {
  const renderDot = () => {
    if (hoverCoordinates.x !== null && hoverCoordinates.y !== null) {

      return (
        <div style={{position: 'absolute', top: `${hoverCoordinates.y}%`, left: `${hoverCoordinates.x}%`, transform: 'translate(-50%, -50%)', width: '6px', height: '6px', backgroundColor: 'red', borderRadius: '50%'}}></div>
        
      );
    }
    return null;
  };
  

  return (
    <div id="image-display" style={{ position: 'relative' }}>
      <img src={imageUrl} alt={imageUrl} style={{ minWidth: '100%', maxWidth: '100%', height: 'auto', maxHeight: '600px', objectFit: 'contain' }} />
      {renderDot()}
    </div>
  );
};

export default ImageDisplay;
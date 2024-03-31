import React, { useState } from 'react';
import StarRating from './stars.js';
import SingleAnnotation from './annotationText.js';
import TextColumn from './TextCol.js';
import AnnotationComments from './AnnotationComments.js';
import placeholderImage from '../../assets/images/art5.webp';
import ImageDisplay from './ClickableImg.js';

const ArtTextCols = ({ text }) => {
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [allowDotPlacement, setAllowDotPlacement] = useState(false);
  const [clickCoordinates, setClickCoordinates] = useState({ x: null, y: null });

  const handleAddCommentClick = () => {
    setAllowDotPlacement(true);
  };

  const handleButtonClick = () => {
    setShowAnnotations(!showAnnotations);
  };

  const handleImageClick = (event) => {
    if (allowDotPlacement) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setClickCoordinates({ x, y });
    }
  };

  const buttonText = showAnnotations ? 'View Information' : 'View Annotations';

  return (
    <div style={{ width: '90%', margin: 'auto' }}>
      <hr style={{ width: '100%', margin: 'auto' }} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', padding: '40px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxWidth: '50%' }}>
            <ImageDisplay imageUrl={placeholderImage} onClick={handleImageClick} allowDotPlacement={allowDotPlacement} clickCoordinates={clickCoordinates}  style={{ maxWidth: '100%', height: 'auto' }} />
          <div style={{ marginTop: '10px' }}>
            <StarRating />
          </div>
          <div style={{ textAlign: 'center', paddingTop: '10px' }}>
            <button style={{ fontSize: '20px', color: 'gray', border: '1px solid #ccc', padding: '5px 10px', borderRadius: '8px' }}>{'Write a Review'}</button>
          </div>
          <div style={{ textAlign: 'center', paddingTop: '10px' }}>
            <button onClick={handleButtonClick} style={{ fontSize: '20px', color: 'gray', border: '1px solid #ccc', padding: '5px 10px', borderRadius: '8px' }}>{buttonText}</button>
          </div>
        </div>
        <div style={{ margin: '20px', position: 'relative', width: '50%' }}>
          <div style={{ width: '100%' }}>
            {showAnnotations ? (
              <AnnotationComments comments={[]} onAddCommentClick={handleAddCommentClick} allowDotPlacement={allowDotPlacement} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
            ) : (
              <TextColumn header="TITLE" text={text} info="Author, date, medium" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtTextCols;
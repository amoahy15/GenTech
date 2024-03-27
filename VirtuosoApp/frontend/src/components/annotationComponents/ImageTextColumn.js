import React, { useState } from 'react';
import placeholderImage from '../../assets/images/art5.webp';
import StarRating from './stars.js'
import SingleAnnotation from './annotationText.js';
import ImageDisplay from './ClickableImg.js'
import TextColumn from './TextCol.js'
import AnnotationComments from './AnnotationComments.js'
import ImageWithMap from './Mapping.js';
 {/* just the two main columns in /review along with the click handling, which involves several components*/} 
 const ArtTextCols = ({ text }) => {
  const [showAnnotations, setShowAnnotations] = useState(false);

  const handleImageClick = () => {
    setShowAnnotations(!showAnnotations);
  };


  return (
    <div style={{ width: '90%', margin: 'auto' }}>
      <hr style={{ width: '100%', margin: 'auto' }} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', padding: '40px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxWidth: '50%' }}>
          <ImageWithMap onClick={handleImageClick} />
          <div style={{ marginTop: '10px' }}>
            <StarRating />
          </div>
          <div style={{ textAlign: 'center', paddingTop: '10px' }}>
            <button style={{ fontSize: '20px', color: 'gray', border: '1px solid #ccc', padding: '5px 10px', borderRadius: '8px' }}>{'write a review'}</button>
          </div>
        </div>
        <div style={{ margin: '20px', position: 'relative', width: '50%' }}>
          <div style={{ width: '100%' }}>
            {showAnnotations ? (
              <AnnotationComments comments={[]} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
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
import React, { useState } from 'react';
import placeholderImage from '../../assets/images/art5.webp';
import StarRating from './stars.js'
import SingleAnnotation from './annotationText.js';
import ImageDisplay from './ClickableImg.js'
import TextColumn from './TextCol.js'
import AnnotationComments from './AnnotationComments.js'

 {/* just the two main columns in /review along with the click handling, which involves several components*/} 
const ArtTextCols = ({text}) => {
  const [displayTextColumn, setDisplayTextColumn] = useState(true);

  const handleImageClick = () => {
    setDisplayTextColumn(!displayTextColumn);
  };
  
  return (
    <div>
      <hr style={{ width: '90%', margin: 'auto' }} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', margin: '0px 20px', padding: '40px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxWidth: '50%' }}>
          <ImageDisplay onClick={handleImageClick} imageUrl={placeholderImage} />
          <div style={{ marginTop: '10px' }}>
            <StarRating />
          </div>
          <div style={{ textAlign: 'center', paddingTop: '10px' }}>
            <button style={{ fontSize: '20px', color: 'gray', border: '1px solid #ccc', padding: '5px 10px', borderRadius: '8px' }}>{'write a review'}</button>
          </div>
        </div>
        <div style={{ margin: '20px' }} />
        {displayTextColumn ? (
          <TextColumn header="TITLE" text={text} info="Author, date, medium" />
        ) : (
          <AnnotationComments text="Placeholder" />
        )}
      </div>
    </div>
  );
};

export default ArtTextCols;
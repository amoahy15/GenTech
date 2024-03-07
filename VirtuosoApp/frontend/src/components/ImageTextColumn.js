import React, { useState } from 'react';
import placeholderImage from '../assets/images/art5.webp';
import StarRating from './stars.js'
import SingleAnnotation from './annotationText.js';

const ImageDisplay = ({ imageUrl, onClick }) => (
  <div style={{ width: '100%' }} onClick={onClick}>
    <img
      src={imageUrl}
      alt="Image"
      style={{ minWidth: '100%', maxWidth: '100%', height: 'auto', objectFit: 'cover' }}
    />
  </div>
);

const TextColumn = ({ text, header, info }) => (
  <div style={{ flex: 2, maxWidth: '50%', border: '1px solid #cccccc', borderRadius: '10px', padding: '10px' }}>
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'left' }}>{header}</h1>
      <h3 style={{ textAlign: 'left', color: 'gray', paddingBottom: '10px'}}><i>{info}</i></h3>
      <p>{text}</p>
    </div>
  </div>
);

const AnnotationComments = ({ comments }) => {
  return (
    <div style={{ flex: 2, maxWidth: '50%', border: '1px solid #cccccc', borderRadius: '10px', padding: '10px' }}>
      <div style={{ padding: '20px' }}>
          <SingleAnnotation username={"user1"} comment={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"}/>
          <SingleAnnotation username={"user2"} comment={"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}/>
          <SingleAnnotation username={"user3"} comment={"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}/>
          <SingleAnnotation username={"user4"} comment={"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}/>

      </div>
    </div>
  );
};


  

const FlexibleColumns = ({text}) => {
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

export default FlexibleColumns;
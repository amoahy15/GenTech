import React, { useState } from 'react';
import StarRating from './stars.js';
import SingleAnnotation from './annotationText.js';
import TextColumn from './TextCol.js';
import AnnotationComments from './AnnotationComments.js';
import placeholderImage from '../../assets/images/art5.webp';
import ImageDisplay from './ClickableImg.js';
import FetchAnnotate from './FetchAnnotate.js'

//todo: pass in info directly from reviewpage.js
//todo: top priority refactoring
const ArtTextCols = ({ text }) => {
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [allowDotPlacement, setAllowDotPlacement] = useState(false);
  const [clickCoordinates, setClickCoordinates] = useState({ x: null, y: null });

  //actually called in fetchannotate
  const [hoverCoordinates, setHoverCoordinates] = useState({ x: null, y: null });

  const handleAddCommentClick = () => {
    setAllowDotPlacement(true);
  };

  //toggle annotations
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

{/* old test annotations */}
  const annotations = [
    { username: "user1", comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam" },
    { username: "user2", comment: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
    { username: "user3", comment: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { username: "user5", comment: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { username: "user6", comment: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { username: "user4", comment: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }
  ];

  //change appearance of buttons 
  const buttonText = showAnnotations ? 'View Information' : 'View Annotations';

  return (
    <div style={{ width: '90%', margin: 'auto' }}>
      <hr style={{ width: '100%', margin: 'auto' }} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', padding: '40px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxWidth: '50%' }}>
            <ImageDisplay imageUrl={placeholderImage} allowDotPlacement={allowDotPlacement} style={{ maxWidth: '100%', height: 'auto' }} hoverCoordinates={hoverCoordinates}/>
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
            {/* toggle functionality */}
            {showAnnotations ? (

              //<AnnotationComments comments={annotations} onAddCommentClick={handleAddCommentClick} allowDotPlacement={allowDotPlacement} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
              <FetchAnnotate artworkID={"20cc4d78-a17c-49b9-8e7c-5b32cb57d7a3"} setHoverCoordinates={setHoverCoordinates} url = {placeholderImage}></FetchAnnotate>
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
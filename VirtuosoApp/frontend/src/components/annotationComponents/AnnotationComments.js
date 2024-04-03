import React, { useState } from "react";
import SingleAnnotation from "./annotationText";
import PopupForm from "./PopupForm";
//for annotations (when toggled)
const AnnotationComments = ({ comments, clickCoordinates, onAddCommentClick }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddAnnotationClick = () => {
    setShowPopup(true);
  };

  const handleAnnotationSubmit = (annotationText) => {
    if (clickCoordinates && clickCoordinates.x !== undefined && clickCoordinates.y !== undefined) {
      onAddCommentClick(annotationText, clickCoordinates);
    }
  };

  return (
    <div style={{ flex: 2, maxWidth: '100%', border: '1px solid #cccccc', borderRadius: '10px', padding: '10px', maxHeight: '500px', overflowY: 'auto'}}>
      <div style={{ padding: '20px' }}>
        <div style={{ textAlign: 'left', marginBottom: '20px', cursor: 'pointer' }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }} onClick={handleAddAnnotationClick}>+</span>
          {showPopup && <PopupForm onSubmit={handleAnnotationSubmit} onClose={() => setShowPopup(false)} />}
        </div>
        <SingleAnnotation username={"user1"} comment={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"} />
        <SingleAnnotation username={"user2"} comment={"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."} />
        <SingleAnnotation username={"user3"} comment={"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} />
        <SingleAnnotation username={"user5"} comment={"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} />
        <SingleAnnotation username={"user6"} comment={"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} />
        <SingleAnnotation username={"user4"} comment={"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} />
      </div>
    </div>
  );
};

export default AnnotationComments;
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
          <span style={{ fontSize: '24px', fontWeight: 'bold'}} onClick={handleAddAnnotationClick}>+</span>
          <hr style={{marginTop: '10px', color: 'gray'}}></hr>
          {showPopup && <PopupForm onSubmit={handleAnnotationSubmit} onClose={() => setShowPopup(false)} />}
        </div>
        {comments.map((comment, index) => (
          <SingleAnnotation key={index} username={comment.username} comment={comment.comment} />
        ))}
      </div>
    </div>
  );
};

export default AnnotationComments;
import React, { useState } from "react";
import SingleAnnotation from "./annotationText";

//for annotations (when toggled)
const AnnotationComments = ({ comments, clickCoordinates, onAddCommentClick }) => {
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [annotationText, setAnnotationText] = useState("");

  const handleAddAnnotationClick = () => {
    setShowCoordinates(true);
    if (showCoordinates) {
      console.log("Clicked again to annotate");
      onAddCommentClick(annotationText);
      setAnnotationText(""); 
    }
  };

  const handleTextChange = (event) => {
    setAnnotationText(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleAddAnnotationClick();
  };

  const renderAnnotationText = () => {
    if (showCoordinates && clickCoordinates && clickCoordinates.x !== undefined && clickCoordinates.y !== undefined) {
      console.log(`Clicked coordinates: (${clickCoordinates.x}, ${clickCoordinates.y})`);
      return (
        <form onSubmit={handleFormSubmit}>
          <input type="text" value={annotationText} onChange={handleTextChange} placeholder="Type your annotation here" />
          <button type="submit">Add</button>
        </form>
      );
    } else if (showCoordinates) {
      return " Click where you want to annotate";
    } else {
      return " Add an annotation";
    }
  };

  return (
    <div style={{ flex: 2, maxWidth: '100%', border: '1px solid #cccccc', borderRadius: '10px', padding: '10px', maxHeight: '500px', overflowY: 'auto'}}>
      <div style={{ padding: '20px' }}>
        <div style={{ textAlign: 'left', marginBottom: '20px', cursor: 'pointer' }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }} onClick={handleAddAnnotationClick}>+</span>
          <span style={{ fontSize: '14px', color: 'gray'}}>{renderAnnotationText()}</span>
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
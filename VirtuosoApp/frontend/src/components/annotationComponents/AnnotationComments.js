import React from "react";
import SingleAnnotation from "./annotationText";

 {/* Calls several of the single comments and arranges them together in a box*/} 
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

  export default AnnotationComments;
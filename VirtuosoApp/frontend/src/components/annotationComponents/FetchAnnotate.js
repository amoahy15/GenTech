import React, { useState, useEffect } from "react";
import AnnotationComments from "./AnnotationComments";
import axios from "axios";
import PopupForm from "./PopupForm";
import SingleAnnotation from "./annotationText";

const FetchAnnotate = ({ artworkID }) => {
  const [annotations, setAnnotations] = useState([]);
  const [clickCoordinates, setClickCoordinates] = useState(null);
  const [showPopup, setShowPopup] = useState(false);


//get user info here (incl username)
  const fetchAnnotations = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/annotations/artwork/${artworkID}`);
      const annotationsWithUsernames = await Promise.all(
        response.data.map(async (annotation) => {
          const userResponse = await axios.get(`http://127.0.0.1:5000/api/user/user/${annotation.userID}`);
          return {
            ...annotation,
            username: userResponse.data.user_name
          };
        })
      );
      setAnnotations(annotationsWithUsernames);
    } catch (error) {
      console.error("Error fetching annotations:", error);
    }
  };

  useEffect(() => {
    if (artworkID) {
      fetchAnnotations();
    }
  }, [artworkID]);

  //popup.js
  const handleAddAnnotationClick = () => {
    setShowPopup(true);
  };

  //refresh 
  const handleAnnotationSubmit = async (annotationText, clickCoordinates) => {
    try {
      await fetchAnnotations();
    } catch (error) {
      console.error("Error adding annotation:", error);
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
        {annotations.map((annotation, index) => (
          <SingleAnnotation key={index} username={annotation.username} comment={annotation.message} />
        ))}
      </div>
    </div>
  );
};

export default FetchAnnotate;

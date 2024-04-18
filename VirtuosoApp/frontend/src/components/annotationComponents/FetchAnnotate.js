import React, { useState, useEffect } from "react";
import AnnotationComments from "./AnnotationComments";
import axios from "axios";
import PopupForm from "./PopupForm";
import SingleAnnotation from "./annotationText";

const FetchAnnotate = ({ artworkID, setHoverCoordinates, url }) => {
  const [annotations, setAnnotations] = useState([]);
  const [clickCoordinates, setClickCoordinates] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  //const [hoverCoordinates, setHoverCoordinates] = useState({ x: null, y: null });


  const handleAnnotationHover = (x, y) => {
    setHoverCoordinates({ x, y });
  };

//get user info here (incl username) 
//TODO: profile pic? (in info)


  const fetchAnnotations = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/annotations/artwork/${artworkID}/annotations`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }});
      const info = await Promise.all(
        response.data.map(async (annotation) => {
          return {
            ...annotation,
          };
        })
      );
      setAnnotations(info);
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
  const handleAnnotationSubmit = async () => {
    try {
      await fetchAnnotations();
    } catch (error) {
      console.error("Error adding annotation:", error);
    }
  };

  const handleDeleteAnnotation = async (annotationId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/annotations/annotations/${annotationId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchAnnotations(); 
    } catch (error) {
      console.error("Error deleting annotation:", error);
    }
  };

  return (
    <div style={{ flex: 2, maxWidth: '100%', border: '1px solid #cccccc', borderRadius: '10px', padding: '10px', maxHeight: '500px', overflowY: 'auto'}}>
      <div style={{ padding: '20px' }}>
        <div style={{ textAlign: 'left', marginBottom: '20px', cursor: 'pointer' }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold'}} onClick={handleAddAnnotationClick}>+</span>
          <hr style={{marginTop: '10px', color: 'gray'}}></hr>
          {showPopup && <PopupForm onSubmit={handleAnnotationSubmit} onClose={() => setShowPopup(false)} url={url} />}
        </div>
        {annotations.map((annotation, index) => (
          <SingleAnnotation annotation={annotation} onDelete= {handleDeleteAnnotation} key={index} username={annotation.user_name} comment={annotation.message} x={annotation.x_coordinate} y={annotation.y_coordinate} onHover={setHoverCoordinates}/>
        ))}
      </div>
    </div>
  );
};

export default FetchAnnotate;

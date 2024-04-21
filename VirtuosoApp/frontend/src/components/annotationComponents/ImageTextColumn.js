import React, { useState, useEffect } from 'react';
import StarRating from './stars.js';
import SingleAnnotation from './annotationText.js';
import TextColumn from './TextCol.js';
import AnnotationComments from './AnnotationComments.js';
import placeholderImage from '../../assets/images/art5.webp';
import ImageDisplay from './ClickableImg.js';
import FetchAnnotate from './FetchAnnotate.js'
import RevPopup from './RevPopup.js';
import axios from 'axios';
import RevEdit from './RevEdit.js';
import { useParams } from 'react-router-dom';
//todo: pass in info directly from reviewpage.js
//todo: top priority refactoring
const ArtTextCols = ({artworkID, handleSubmit, userHasReviewed, userReviewId}) => {
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [allowDotPlacement, setAllowDotPlacement] = useState(false);
  const [clickCoordinates, setClickCoordinates] = useState({ x: null, y: null });
  const [showPopup, setShowPopup] = useState(false);
  const [showEdit, setShowEdit] = useState(0);

  //actually called in fetchannotate
  const [hoverCoordinates, setHoverCoordinates] = useState({ x: null, y: null });

  const [artwork, setArtwork] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArtwork = async () => {
      console.log('Fetching artwork with ID:', artworkID);  
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/artwork/get_artwork/${artworkID}`);
        console.log('Received data:', response.data);  
        setArtwork(response.data);
      } catch (err) {
        console.error('Error fetching artwork:', err);  
        if (err.response && err.response.data) {
          setError(err.response.data.error);
        } else {
          setError('Failed to fetch artwork');
        }
      }
    };

    fetchArtwork();
}, [artworkID]);  

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!artwork) {
    return <div>Loading...</div>;
  }

  const handleAddCommentClick = () => {
    setAllowDotPlacement(true);
  };

  //toggle annotations
  const handleButtonClick = () => {
    setShowAnnotations(!showAnnotations);
  };
  //reviews
  const handleButtonClick2 = () => {
    setShowPopup(!showPopup);
  };
  const handleButtonClick3 = () => {
    setShowEdit(!showEdit);
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', padding: '40px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxWidth: '50%' }}>
            <ImageDisplay imageUrl={artwork.image_url} allowDotPlacement={allowDotPlacement} style={{ maxWidth: '100%', height: 'auto' }} hoverCoordinates={hoverCoordinates}/>
          <div style={{ marginTop: '10px' }}>
          </div>
          <div style={{ textAlign: 'center', paddingTop: '10px' }}>
            {userHasReviewed ? (<button onClick={handleButtonClick3} 
            style={{ fontSize: '20px', color: 'gray', border: '1px solid #ccc', padding: '5px 10px', borderRadius: '8px' }}>{'Edit Your Review'}</button>) :
            (<button onClick={handleButtonClick2} 
              style={{ fontSize: '20px', color: 'gray', border: '1px solid #ccc', padding: '5px 10px', borderRadius: '8px' }}>{'Write a Review'}</button>)}
          </div>


          {!!showPopup && 
              <RevPopup 
                  onSubmit={() => setShowPopup(false)} 
                  onClose={() => setShowPopup(false)} 
                  url={placeholderImage}
                  artworkID={artworkID}
                  handleSubmit = {handleSubmit}
              />
          }
          {!!showEdit && 
              <RevEdit 
                onSubmit={() => setShowEdit(false)}
                onClose={() => setShowEdit(false)}
                handleSubmit={handleSubmit} //HERE
                reviewId={userReviewId}
              />
          }
          <div style={{ textAlign: 'center', paddingTop: '10px' }}>
            <button onClick={handleButtonClick} 
            style={{ fontSize: '20px', color: 'gray', border: '1px solid #ccc', padding: '5px 10px', borderRadius: '8px' }}>{buttonText}</button>
          </div>
        </div>
        <div style={{ margin: '20px', position: 'relative', width: '50%' }}>
          <div style={{ width: '100%' }}>
            {/* toggle functionality */}
            {showAnnotations ? (

              //<AnnotationComments comments={annotations} onAddCommentClick={handleAddCommentClick} allowDotPlacement={allowDotPlacement} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
              <FetchAnnotate artworkID={artworkID} 
              setHoverCoordinates={setHoverCoordinates} 
              url = {placeholderImage}></FetchAnnotate>
            ) : (
              <TextColumn header={artwork.title} text={artwork.description} 
              name={artwork.artist_name} year={artwork.year} rating={artwork.average_rating}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtTextCols;
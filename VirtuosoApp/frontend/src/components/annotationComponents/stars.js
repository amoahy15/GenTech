import React, { useState } from "react";
import button from "../styles/stars.module.css";

 {/* displays and handles click of the stars*/} 
const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleStarClick = (index) => {
    setRating(index);
  };

  const handleMouseOn = (index) => {
    setHover(index);
  };

  const handleMouseOff = () => {
    setHover(rating);
  };

  return (
    <div className={button["button"]}>
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1;
        return (
          <button
            type="button"
            key={starIndex}
            className={starIndex <= (hover||rating) ? button.on:button.off}
            onClick={() => handleStarClick(starIndex)}
            onMouseEnter={() => handleMouseOn(starIndex)}
            onMouseLeave={handleMouseOff}
          >
            <span className={button.star}>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;

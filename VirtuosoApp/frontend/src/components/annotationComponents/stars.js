import React, { useState } from "react";
import button from "../styles/stars.module.css";

const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleStarClick = (starIndex) => {
    setRating(starIndex);
    onRatingChange(starIndex);
  };

  const handleMouseOn = (starIndex) => {
    setHover(starIndex);
  };

  const handleMouseOff = () => {
    setHover(rating);
  };

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const starIndex = index + 1;
        return (
          <button
            type="button"
            key={starIndex}
            className={starIndex <= (hover || rating) ? button.on : button.off}
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

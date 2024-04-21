import React, { useState, useEffect } from "react";
import button from "../styles/stars.module.css";

const StarRating = ({ rating: initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  // Synchronize internal state with the external rating prop
  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleStarClick = (starIndex) => {
    setRating(starIndex);
    onRatingChange(starIndex);
  };

  const handleMouseOn = (starIndex) => {
    setHover(starIndex);
  };

  const handleMouseOff = () => {
    setHover(rating); // Ensures that hover state resets to current rating
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
            onMouseLeave={handleMouseOff}>
            <span className={button.star}>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};
export default StarRating;

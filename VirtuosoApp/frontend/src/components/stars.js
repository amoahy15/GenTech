import React, { useState } from "react";
import button from "./styles/stars.module.css"; // Import CSS module

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleStarClick = (index) => {
    setRating(index);
  };

  const handleMouseEnter = (index) => {
    setHover(index);
  };

  const handleMouseLeave = () => {
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
            className={starIndex <= (hover || rating) ? button.on : button.off}
            onClick={() => handleStarClick(starIndex)}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
          >
            <span className={button.star}>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;

import React from "react";
import button from "../styles/stars.module.css";

const StaticStarRating = ({ rating }) => {
  return (
    <div className={button["button"]}>
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1;
        return (
          <button
            type="button"
            key={starIndex}
            className={starIndex <= rating ? button.on : button.off}
          >
            <span className={button.star}>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StaticStarRating;

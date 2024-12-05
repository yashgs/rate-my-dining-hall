import React, { useState } from 'react';
import '../components/StarRating.css';

function StarRating({ rating, onRatingChange }) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (newRating) => {
    onRatingChange(newRating);
  };

  const handleMouseEnter = (newHoverRating) => {
    setHoverRating(newHoverRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = hoverRating >= star || (!hoverRating && rating >= star);
        return (
          <span
            key={star}
            className={isFilled ? 'star filled' : 'star'}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;

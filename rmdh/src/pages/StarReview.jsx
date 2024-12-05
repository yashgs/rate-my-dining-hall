import React from "react";

const StarReview = ({ rating, maxStars = 5 }) => {
  const stars = Array.from({ length: maxStars }, (_, index) => {
    return (
      <span key={index} style={{ color: index < rating ? "gold" : "gray", fontSize: "24px" }}>
        ★
      </span>
    );
  });

  return <div>{stars}</div>;
};

export default StarReview;

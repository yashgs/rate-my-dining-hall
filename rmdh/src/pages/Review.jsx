import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/axiosConfig';
import '../components/ReviewStyle.css'; 

function Review() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`/api/reviews/${id}`);
        console.log(response.data)
        setReview(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || 'An error occurred');
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  if (loading) {
    return <p className="main-content">Loading...</p>;
  }

  if (error) {
    return (
      <div className="main-content">
        <p className="error">{error}</p>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="main-content">
        <p className="error">Review not found.</p>
      </div>
    );
  }

  const {
    rev_title,
    rev_content,
    rev_star_rating,
    rev_tags,
    rev_restaurantid
  } = review;

  return (
    <div className="main-content">
      <div className="review-details-container">
        <h2>Review: "{rev_title}"</h2>
        <div className="review-author">
          <p className="star-rating">{'★'.repeat(rev_star_rating)}</p>
        </div>
        <div className="review-content">
          <p>"{rev_content}"</p>
        </div>
        {rev_tags && rev_tags.length > 0 && (
          <div className="review-tags">
            <strong>Tags:</strong>
            <ul>
              {rev_tags.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          </div>
        )}
        <Link to={`/restaurant/${review.rev_restaurantid}`}>Back to Restaurant</Link>
      </div>
    </div>
  );
}

export default Review;

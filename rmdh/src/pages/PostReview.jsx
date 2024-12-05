import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import StarRating from './StarRating';
import '../components/Page.css';
import '../components/FormStyles.css';

function PostReview() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    rev_title: '',
    rev_content: '',
    rev_tags: '',
    rev_star_rating: 0,
    rev_userid: localStorage.getItem('userID')
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        console.log(`/api/restaurants/${restaurantId}`)
        const response = await axios.get(`/api/restaurants/${restaurantId}`);
        setRestaurant(response.data);
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || 'An error occurred');
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStarRatingChange = (rating) => {
    setFormData({
      ...formData,
      rev_star_rating: rating,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.post(
        '/api/reviews',
        {
          ...formData,
          rev_tags: formData.rev_tags.split(',').map((tag) => tag.trim()),
          rev_restaurantid: restaurantId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/restaurant/${restaurantId}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  if (loading) {
    return <p className="page-container">Loading...</p>;
  }

  if (!restaurant) {
    return (
      <div className="page-container">
        <p className="error">Restaurant not found.</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Write a Review for {restaurant.res_name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="rev_title">Title:</label>
            <input
              type="text"
              id="rev_title"
              name="rev_title"
              value={formData.rev_title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rev_content">Content:</label>
            <textarea
              id="rev_content"
              name="rev_content"
              value={formData.rev_content}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Star Rating:</label>
            <StarRating
              rating={formData.rev_star_rating}
              onRatingChange={handleStarRatingChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rev_tags">Tags (comma-separated):</label>
            <input
              type="text"
              id="rev_tags"
              name="rev_tags"
              value={formData.rev_tags}
              onChange={handleChange}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default PostReview;

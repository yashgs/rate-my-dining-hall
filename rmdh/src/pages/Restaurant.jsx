import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import '../components/Page.css'; 
import ReviewButton from './ReviewButton';


function Restaurant() {
const navigate = useNavigate();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handlePostReview = () => {
    console.log(`/restaurant/${id}/postreview`)
    navigate(`/restaurant/${id}/postreview`);
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`/api/restaurants/${id}`);
        setRestaurant(response.data);
        setLoading(false);

      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || 'An error occurred');
        setLoading(false);
      }
    };

    fetchRestaurant();
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

  if (!restaurant) {
    return (
      <div className="page-container">
        <p className="error">Restaurant not found.</p>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="page-container">
        <h2>{restaurant.res_name}</h2>
        <p><strong>{restaurant.res_cuisine} Cuisine</strong> • <strong>Menu:</strong> {restaurant.res_menu} • {restaurant.res_price_range}</p>
        <button onClick={handlePostReview}>
            Review
        </button>
        <ul className="reviews-list">
          {restaurant.reviews.map((review) => (
            <li key={review.uni_universityid}>
                <ReviewButton review={review} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Restaurant;

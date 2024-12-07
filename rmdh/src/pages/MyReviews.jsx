import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import '../components/Page.css'; 
import ReviewButton from './ReviewButton';


function MyReviews() {
const navigate = useNavigate();
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUserReviews = async () => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            navigate('/login');
          } else {
            try {
                const response = await axios.get(`/api/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                const userData = response.data;
                console.log(userData)
                setUser(response.data);
                const response2 = await axios.get(`/api/reviews/user/${userData.user_userid}`);
                console.log(response2.data);
                setReviews(response2.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.error || 'An error occurred');
                setLoading(false);
            }
        }
    };

    getUserReviews();
  }, []);

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

  if (!reviews) {
    return (
      <div className="page-container">
        <p className="error">Restaurant not found.</p>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="page-container">
        <h2 className="universities-title">My Reviews</h2>
        <ul className="reviews-list">
          {reviews.map((review) => (
            <li key={review.rev_universityid} className="review-item">
              <ReviewButton review={review} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MyReviews;

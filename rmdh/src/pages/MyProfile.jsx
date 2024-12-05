import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import '../components/Page.css'; 

function MyProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
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
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.error || 'An error occurred');
                setLoading(false);
            }
        }
    };

    fetchUser();
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

  if (!user) {
    return (
      <div className="page-container">
        <p className="error">User not found.</p>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="page-container">
        <h2>My Profile</h2>
        <p><strong>Name:</strong> {user.user_first_name} {user.user_last_name}</p>
        <p><strong>User ID:</strong> {user.user_userid}</p>
        <p><strong>Proximity Preference:</strong> {user.user_proximity_preference} miles</p>
        <p><strong>Preferred Price Range:</strong> {user.user_price_range}</p>
        <p><strong>Cuisine Preference:</strong> {user.user_cuisine_preference}</p>
        <p><strong>Dietary Restrictions:</strong> {user.user_dietary_restriction}</p>
        <p><strong>Email:</strong> {user.user_email}</p>
      </div>
    </div>
  );
}

export default MyProfile;

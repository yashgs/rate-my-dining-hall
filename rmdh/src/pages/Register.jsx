import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import '../components/Page.css'; 

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_email: '',
    password: '',
    user_first_name: '',
    user_last_name: '',
    user_universityid: '',
    user_proximity_preference: '',
    user_price_range: '$',
    user_cuisine_preference: '',
    user_dietary_restriction: '',
  });
  const [error, setError] = useState('');

  const priceRanges = ['$', '$$', '$$$', '$$$$'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/register', formData);
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-grid">
            <div className="input-group">
              <label htmlFor="user_first_name">First Name</label>
              <input
                type="text"
                id="user_first_name"
                name="user_first_name"
                value={formData.user_first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="user_last_name">Last Name</label>
              <input
                type="text"
                id="user_last_name"
                name="user_last_name"
                value={formData.user_last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="user_email">Email</label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="user_universityid">University ID</label>
              <input
                type="number"
                id="user_universityid"
                name="user_universityid"
                value={formData.user_universityid}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="user_proximity_preference">Proximity (miles)</label>
              <input
                type="number"
                id="user_proximity_preference"
                name="user_proximity_preference"
                value={formData.user_proximity_preference}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="user_price_range">Price Range</label>
              <select
                name="user_price_range"
                value={formData.user_price_range}
                onChange={handleChange}
              >
                {priceRanges.map((price) => (
                  <option key={price} value={price}>
                    {price}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="user_cuisine_preference">Cuisine Preferences</label>
              <input
                type="text"
                id="user_cuisine_preference"
                name="user_cuisine_preference"
                value={formData.user_cuisine_preference}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="user_dietary_restriction">Dietary Restrictions</label>
              <input
                type="text"
                id="user_dietary_restriction"
                name="user_dietary_restriction"
                value={formData.user_dietary_restriction}
                onChange={handleChange}
              />
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-button">Register</button>
        </form>
        <p className="login-footer">
          Already have an account? <a href="/login">Login Here</a>
        </p>
      </div>
    </div>
  );
}

export default Register;

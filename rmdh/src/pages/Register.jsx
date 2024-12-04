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
    <div className="page-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for each required input */}
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="user_first_name"
            value={formData.user_first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="user_last_name"
            value={formData.user_last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>University ID:</label>
          <input
            type="number"
            name="user_universityid"
            value={formData.user_universityid}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Proximity Preference (miles):</label>
          <input
            type="number"
            name="user_proximity_preference"
            value={formData.user_proximity_preference}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price Range:</label>
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
        <div>
          <label>Cuisine Preferences (comma-separated):</label>
          <input
            type="text"
            name="user_cuisine_preference"
            value={formData.user_cuisine_preference}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Dietary Restrictions:</label>
          <input
            type="text"
            name="user_dietary_restriction"
            value={formData.user_dietary_restriction}
            onChange={handleChange}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login Here</a>
      </p>
    </div>
  );
}

export default Register;

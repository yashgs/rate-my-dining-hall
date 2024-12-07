import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import '../components/Page.css'; 
import RestaurantButton from './RestaurantButton';

function University() {
  const { id } = useParams();
  console.log(id)
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [universityRestaurants, setUniRests] = useState([]);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const response = await axios.get(`/api/universities/${id}`);
        setUniversity(response.data);
        const uniData = response.data;
        const response2 = await axios.get(`/api/restaurants/university/${uniData.uni_universityid}`);
        setUniRests(response2.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || 'An error occurred');
        setLoading(false);
      }
    };

    fetchUniversity();
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

  if (!university) {
    return (
      <div className="page-container">
        <p className="error">University not found.</p>
      </div>
    );
  }

  return (
  <div className="main-content">
    <div className="page-container">
      <h2 className="universities-title">{university.uni_name}</h2>
      <p>
        <strong>Latitude:</strong> {university.latitude}, <strong>Longitude:</strong> {university.longitude}
      </p>
      <div className="restaurants-container">
        <h3>Restaurants at {university.uni_name}</h3>
        <ul className="unirests-list">
          {universityRestaurants.map((uRest) => (
            <li key={uRest.res_restaurantid} className="restaurant-item">
              <a href={"/restaurant/" + uRest.res_restaurantid}>
                <RestaurantButton restaurant={uRest} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

}

export default University;

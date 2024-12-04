// src/pages/University.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import '../components/Page.css'; 

function University() {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const response = await axios.get(`/api/universities/${id}`);
        setUniversity(response.data);
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
        <h2>{university.uni_name}</h2>
        <p>
          <strong>Latitude:</strong> {university.latitude}
        </p>
        <p>
          <strong>Longitude:</strong> {university.longitude}
        </p>
      </div>
    </div>
  );
}

export default University;

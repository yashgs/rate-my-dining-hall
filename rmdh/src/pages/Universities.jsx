import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axiosConfig';
import '../components/Page.css'; 

function Universities() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get('/api/universities');
        setUniversities(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || 'An error occurred');
        setLoading(false);
      }
    };

    fetchUniversities();
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

  return (
    <div className="main-content">
      <div className="page-container">
        <h2 className="universities-title">Universities</h2>
        <ul className="universities-list">
          {universities.map((university) => (
            <li key={university.uni_universityid} className="university-item">
              <Link to={`/university/${university.uni_universityid}`} className="university-link">
                {university.uni_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
}

export default Universities;

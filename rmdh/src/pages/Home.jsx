import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../components/Page.css'; 

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userUniversity, setUserUniversity] = useState(null)

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      axios
        .get('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        .then((response) => {
          setUser(response.data);
          const userData = response.data
          const uniURL = `/api/universities/${userData.user_universityid}`;
          axios
          .get(uniURL)
          .then((response2) => {
            setUserUniversity(response2.data);
          })
          .catch((err2) => {
            console.error(err2);
          })
        })
        .catch((err) => {
          console.error(err);
          navigate('/login');
        });
    }

  }, []);

  const handleLogout = () => {
    // Remove token from storage
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user || !userUniversity) {
    return <p>Loading...</p>;
  }

  return (
    <div className="page-container">
      <h2>Welcome, {user.user_first_name}!</h2>
      <a href={"/university/" + user.user_universityid}>
        <p>{userUniversity.uni_name}</p>
      </a>
    </div>
  );
}

export default Home;

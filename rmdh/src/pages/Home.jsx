import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../components/Page.css'; 
import RestaurantButton from './RestaurantButton';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userUniversity, setUserUniversity] = useState(null)
  const [universityRestaurants, setUniRests] = useState([])

  useEffect(() => {
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
          axios.get(uniURL).then((response2) => {
            setUserUniversity(response2.data);
          }).catch((err2) => {
            console.error(err2);
          });
          axios.get(`/api/restaurants/university/${userData.user_universityid}`).then((response3) => {
            const uniRests = response3.data;
            console.log(uniRests);
            setUniRests(uniRests);
          }).catch((err3) => {
            console.error(err3);
          });
          
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

  if (!user || !userUniversity || !universityRestaurants) {
    return <p>Loading...</p>;
  }

  return (
    <div className="page-container">
      <h2>Welcome back, {user.user_first_name}!</h2>
      <p>Restaurants you may like at your school, <a href={"/university/" + user.user_universityid}> <strong>{userUniversity.uni_name}</strong></a>.</p>
      
      <ul className="unirests-list">
          {universityRestaurants.map((uRest) => (
            <li key={uRest.res_restaurantid}>
              <a href={"/restaurant/" + uRest.res_restaurantid}>
                <RestaurantButton restaurant={uRest} />
              </a>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default Home;

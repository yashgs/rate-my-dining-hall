import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Navbar.css'; 
import logoImage from '../assets/logo.png';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleUP = () => {
    navigate('/profile');
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <img src={logoImage} alt="Site Logo" />
        </a>
        <Link to="/">Rate My Dining Hall</Link>
      </div>
      <ul className="navbar-links">
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/universities">Universities</Link>
            </li>
            <li>
              <Link to="/myreviews">My Reviews</Link>
            </li>
            <li>
              <button className="userprofile-button" onClick={handleUP}>
                <FaUserCircle title="User Profile" />
              </button>
            </li>
            <li>
              <button className="logout-button" onClick={handleLogout}>
              <FaSignOutAlt title="Logout" />
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

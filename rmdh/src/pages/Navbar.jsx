import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Navbar.css'; 
import logoImage from '../assets/logo.png';

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

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
              <button className="navbar-button" onClick={handleLogout}>
                Logout
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

// src/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    padding: '10px',
    backgroundColor: '#f2f2f2',
    marginBottom: '20px',
  };

  const linkStyle = {
    marginRight: '15px',
    textDecoration: 'none',
    color: '#333',
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>
        Home
      </Link>
      <Link to="/login" style={linkStyle}>
        Login
      </Link>
      <Link to="/register" style={linkStyle}>
        Register
      </Link>
    </nav>
  );
}

export default Navbar;

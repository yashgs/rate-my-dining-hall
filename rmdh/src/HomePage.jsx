// src/HomePage.jsx
import React from 'react';

function HomePage() {
  const diningHalls = [
    { name: 'Restaurant A', rating: 4.5 },
    { name: 'Restaurant B', rating: 4.0 },
    { name: 'Restaurant C', rating: 3.5 },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Rate My Dining Hall</h1>
      <p>
        Discover and rate dining halls and restaurants on your college campus.
      </p>
      <h2>Top Rated Dining Halls</h2>
      <ul>
        {diningHalls.map((hall, index) => (
          <li key={index}>
            <strong>{hall.name}</strong> - Rating: {hall.rating} ⭐
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;

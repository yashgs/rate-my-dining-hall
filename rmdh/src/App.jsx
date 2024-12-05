import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './pages/Navbar'
import UniversityPage from './pages/University'
import UniversitiesPage from './pages/Universities'
import MyProfile from './pages/MyProfile'
import Restaurant from './pages/Restaurant'
import PostReview from './pages/PostReview'
import Review from './pages/Review'
import MyReviews from './pages/MyReviews'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/university/:id" element={<UniversityPage />} />
        <Route path="/universities" element={<UniversitiesPage />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
        <Route path="/restaurant/:restaurantId/postreview" element={<PostReview />} />
        <Route path="/review/:id" element={<Review />} />
        <Route path="myreviews" element={<MyReviews />} />
      </Routes>
    </div>
  );
}

export default App;

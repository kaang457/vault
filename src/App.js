import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage'; 
import Login from './Login'; 
import Signup from './SignUp'; 
import Dashboard from './Dashboard';
import AboutPage from './AboutPage'; // Yeni About Page
import ContactPage from './ContactPage'; // Yeni About Page


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Varsayılan rota (Landing Page) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/AboutPage" element={<AboutPage />} />
        <Route path="/ContactPage" element={<ContactPage />} />
        {/* Login ve Signup sayfaları */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;

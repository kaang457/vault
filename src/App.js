import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage'; // Landing Page bileşenini import edin
import Login from './Login'; // Login sayfası
import Signup from './SignUp'; // Signup sayfası

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Varsayılan rota (Landing Page) */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Login ve Signup sayfaları */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;

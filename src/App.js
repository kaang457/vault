import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage'; 
import Login from './Login'; 
import Signup from './SignUp'; 
import Dashboard from './Dashboard'; 

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Varsayılan rota (Landing Page) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Login ve Signup sayfaları */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;

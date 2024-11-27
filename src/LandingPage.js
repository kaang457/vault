import React, { useState } from 'react';
import { Box, Button, Typography, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Box
      sx={{
        width: '100vw', 
        height: '100vh',
        backgroundColor: darkMode ? '#333' : '#f8f9fa', 
        color: darkMode ? '#fff' : '#000', 
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', 
      }}
    >
      {/* Top Bar (Ortada) */}
      <Box
        sx={{
          position: 'absolute',
          top: 20, 
          left: '50%',
          transform: 'translateX(-50%)', 
          width: '40%',
          maxWidth: 600, 
          height: '60px', 
          backgroundColor: '#add8e6', 
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center',
          padding: '0 20px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)', 
          borderRadius: '8px', 
        }}
      >
        {/* Dark Mode Switch */}
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>
            Dark Mode
          </Typography>
          <Switch
            checked={darkMode}
            onChange={handleDarkModeToggle}
            color="default"
          />
        </Box>
      </Box>

      {/* Logo */}
      <Box
        component="img"
        src={logo}
        alt="Logo"
        sx={{
          position: 'absolute', 
          top:5, 
          left: 5, 
          width:200,
          height: 'auto',
        }}
      />

      {/* Login ve Signup Butonları */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: 20, 
          display: 'flex',
          gap: 2, 
        }}
      >
        <Button
          variant="text"
          color="primary"
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
            color: darkMode ? '#fff' : '#000',
          }}
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
          onClick={() => navigate('/signup')}
        >
          Signup
        </Button>
      </Box>

      {/* Ana İçerik */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px', 
        }}
      >
        {/* Sol İçerik */}
        <Box
          sx={{
            flex: 1,
            maxWidth: '50%',
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#333', marginBottom: 3 }}
          >
            BÜYÜK YAZI
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: darkMode ? '#aaa' : '#555',
              marginBottom: 3,
              fontSize: '1.2rem',
            }}
          >
            AÇIKLAMA
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginRight: 2,
                fontWeight: 'bold',
                padding: '10px 20px',
                fontSize: '1rem',
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                fontWeight: 'bold',
                padding: '10px 20px',
                fontSize: '1rem',
              }}
              onClick={() => navigate('/about')}
            >
              About Us
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;

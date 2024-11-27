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
        backgroundColor: darkMode ? '#121212' : '#f8f9fa',
        color: darkMode ? '#f5f5f5' : '#000',
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
          width: '60%',
          maxWidth: 900,
          height: '60px',
          backgroundColor: darkMode ? '#333' : '#c8a2c8',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          borderRadius: '8px',
        }}
      >
        {/* Top Bar Butonları */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Button
            variant="text"
            sx={{
              fontWeight: 'bold',
              fontSize: '1rem',
              color: darkMode ? '#f5f5f5' : '#000',
            }}
            onClick={() => navigate('/features')}
          >
            btn1
          </Button>
          <Button
            variant="text"
            sx={{
              fontWeight: 'bold',
              fontSize: '1rem',
              color: darkMode ? '#f5f5f5' : '#000',
            }}
            onClick={() => navigate('/pricing')}
          >
            btn2
          </Button>
          <Button
            variant="text"
            sx={{
              fontWeight: 'bold',
              fontSize: '1rem',
              color: darkMode ? '#f5f5f5' : '#000',
            }}
            onClick={() => navigate('/contact')}
          >
            btn3
          </Button>
        </Box>

        {/* Dark Mode Switch */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: darkMode ? '#fff' : '#000',
          }}
        >
          <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>
            Dark Mode
          </Typography>
          <Switch
            checked={darkMode}
            onChange={handleDarkModeToggle}
            color="success"
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
          top: 20,
          left: 20,
          width: 150,
          height: 'auto',
          filter: darkMode ? 'invert(1)' : 'none',
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
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
            color: darkMode ? '#f5f5f5' : '#c8a2c8',
          }}
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
        <Button
          variant="contained"
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
            backgroundColor: darkMode ? '#555' : '#c8a2c8',
            color: '#fff',
            '&:hover': {
              backgroundColor: darkMode ? '#666' : '#c8a2c8',
            },
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
            sx={{
              fontWeight: 'bold',
              color: darkMode ? '#f5f5f5' : '#333',
              marginBottom: 3,
            }}
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
              sx={{
                marginRight: 2,
                fontWeight: 'bold',
                padding: '10px 20px',
                fontSize: '1rem',
                backgroundColor: darkMode ? '#555' : '#c8a2c8',
                color: '#fff',
                '&:hover': {
                  backgroundColor: darkMode ? '#666' : '#c8a2c8',
                },
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              sx={{
                fontWeight: 'bold',
                padding: '10px 20px',
                fontSize: '1rem',
                color: darkMode ? '#fff' : '#c8a2c8',
                borderColor: darkMode ? '#666' : '#c8a2c8',
                '&:hover': {
                  backgroundColor: darkMode ? '#555' : '#c8a2c8',
                  borderColor: darkMode ? '#777' : '#c8a2c8',
                },
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

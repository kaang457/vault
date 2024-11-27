import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';
import rightImage from './assets/deneme.png'; // Sağ tarafa ekleyeceğiniz resmi import edin

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'test@example.com' && password === 'password') {
      navigate('/dashboard');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100vh',
      }}
    >
      {/* Sol Login Kutusu ve Logo */}
      <Box
        sx={{
          width: '45%', // Sol taraf ekranın %45'ini kaplar
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
          backgroundColor: '#ffffff', // Sol kutunun arka plan rengi
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Kutunun gölgesi
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            width: 350,
            height: 'auto',
            marginBottom: 1, // Logonun altına boşluk bırakır
          }}
        />
        <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>
          Welcome to Vault
        </Typography>
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: 2, height: 50 }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Typography
          variant="body2"
          sx={{ marginTop: 2, textAlign: 'center' }}
        >
          Don't have an account?{' '}
          <Link
            href="#"
            onClick={() => navigate('/signup')}
            sx={{ cursor: 'pointer', color: 'blue' }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>

      {/* Sağ Resim Kutusu */}
      <Box
        sx={{
          width: '55%', // Sağ taraf ekranın %55'ini kaplar
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 1) 5%, rgba(255, 255, 255, 0) 15%), url(${rightImage})`, // Geçiş efekti ve resim
          backgroundSize: 'cover', // Resmi tam ekran yap
          backgroundPosition: 'center', // Resmi merkeze hizala
        }}
      ></Box>
    </Box>
  );
};

export default Login;

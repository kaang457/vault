import React, { useState } from 'react'
import { TextField, Button, Box, Typography, Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import rightImage from '../assets/deneme.png'
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import LoadingScreen from '../components/LoadingScreen'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const handleSubmit = async e => {
    setLoading(true)
    e.preventDefault()

    try {
      const res = await api.post('token/', { email, password })

      localStorage.setItem(ACCESS_TOKEN, res.data.access)
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
      navigate('/')
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100vh'
      }}
    >
      {/* Sol Login Kutusu ve Logo */}
      <Box
        sx={{
          width: '45%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Logo */}
        <Box
          component='img'
          src={logo}
          alt='Logo'
          sx={{
            width: 350,
            height: 'auto',
            marginBottom: 1
          }}
          onClick={() => {
            window.location.href = '/'
          }}
        />
        <Typography variant='h4' sx={{ marginBottom: 3, textAlign: 'center' }}>
          Welcome to Vault
        </Typography>
        <TextField
          fullWidth
          label='Email'
          type='email'
          variant='outlined'
          margin='normal'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label='Password'
          type='password'
          variant='outlined'
          margin='normal'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {loading && <LoadingScreen />}
        <Button
          fullWidth
          variant='contained'
          sx={{
            marginTop: 2,
            height: 50,
            backgroundColor: '#B8B8F7',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#A5A5E6'
            }
          }}
          onClick={handleSubmit}
        >
          Login
        </Button>

        <Typography variant='body2' sx={{ marginTop: 2, textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link
            onClick={() => navigate('/register')}
            sx={{ cursor: 'pointer', color: 'blue' }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>

      {/* top bar denemesi*/}
      <Box
        sx={{
          position: 'absolute',
          top: 80,
          left: '25%',
          transform: 'translateX(-50%)',
          width: '60%',
          maxWidth: 275,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#B8B8F7',
          padding: 2,
          borderRadius: 5,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Button
            variant='text'
            sx={{
              fontWeight: 'bold',
              fontSize: '1rem',
              color: '#fff'
            }}
            onClick={() => {
              window.location.href = '/'
            }}
          >
            HOME
          </Button>

          <Button
            variant='text'
            sx={{
              fontWeight: 'bold',
              fontSize: '1rem',
              color: '#fff'
            }}
            onClick={() => {
              window.location.href = '/AboutPage'
            }}
          >
            ABOUT
          </Button>
          <Button
            variant='text'
            sx={{
              fontWeight: 'bold',
              fontSize: '1rem',
              color: '#fff'
            }}
            onClick={() => {
              window.location.href = '/ContactPage'
            }}
          >
            CONTACT
          </Button>
        </Box>
      </Box>

      {/* Sağ Resim Kutusu */}
      <Box
        sx={{
          width: '100%',
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 1) 5%, rgba(255, 255, 255, 0) 15%), url(${rightImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></Box>
    </Box>
  )
}

export default Login

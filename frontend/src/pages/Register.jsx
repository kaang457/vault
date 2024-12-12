import React, { useState } from 'react'
import { TextField, Button, Box, Typography, Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import rightImage from '../assets/deneme.png'
import api from '../api'
import LoadingScreen from '../components/LoadingScreen'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    setLoading(true)
    e.preventDefault()

    try {
      await api.post('api/user/register/', { name, email, password })
      alert('Registration successful!')
      navigate('/login')
    } catch (error) {
      alert('Registration failed: ' + error)
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
      {/* Left Registration Box and Logo */}
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
          Create Your Vault Account
        </Typography>
        <TextField
          fullWidth
          label='Name'
          type='text'
          variant='outlined'
          margin='normal'
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
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
          Register
        </Button>

        <Typography variant='body2' sx={{ marginTop: 2, textAlign: 'center' }}>
          Already have an account?{' '}
          <Link
            href='#'
            onClick={() => navigate('/login')}
            sx={{ cursor: 'pointer', color: 'blue' }}
          >
            Login
          </Link>
        </Typography>
      </Box>

      {/* Right Image Box */}
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

export default Register

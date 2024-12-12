import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress
} from '@mui/material'
import GlobalContainer from '../components/GlobalContainer'
import api from '../api'
import colors from '../styles/colors'

const CreateAccount = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    account_type: '',
    currency: '',
    balance: 0
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const themeColors = darkMode ? colors.dark : colors.light

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = () => {
    setLoading(true)
    setError(null)
    api
      .post('/api/accounts/', formData)
      .then(() => {
        alert('Account created successfully!')
        window.location.href = '/accounts'
      })
      .catch(err => {
        setError('Error creating account: ' + err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <GlobalContainer>
      <Box
        sx={{
          maxWidth: '600px',
          margin: 'auto',
          padding: '20px',
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          borderRadius: '8px',
          boxShadow: darkMode
            ? '0px 4px 10px rgba(255, 255, 255, 0.2)'
            : '0px 4px 10px rgba(0, 0, 0, 0.2)'
        }}
      >
        <Typography
          variant='h4'
          sx={{
            textAlign: 'center',
            marginBottom: '20px',
            fontWeight: 'bold',
            color: themeColors.textPrimary
          }}
        >
          Create Account
        </Typography>
        <TextField
          label='Account Type'
          name='account_type'
          select
          fullWidth
          value={formData.account_type}
          onChange={handleInputChange}
          sx={{ marginBottom: '16px' }}
        >
          {[
            { value: 'SAVINGS', label: 'Savings' },
            { value: 'CHECKING', label: 'Checking' },
            { value: 'BUSINESS', label: 'Business' },
            { value: 'JOINT', label: 'Joint' }
          ].map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label='Currency'
          name='currency'
          select
          fullWidth
          value={formData.currency}
          onChange={handleInputChange}
          sx={{ marginBottom: '16px' }}
        >
          {[
            { value: 'TL', label: 'Turkish Lira' },
            { value: 'USD', label: 'US Dollar' },
            { value: 'EUR', label: 'Euro' },
            { value: 'GBP', label: 'British Pound' },
            { value: 'JPY', label: 'Japanese Yen' },
            { value: 'CAD', label: 'Canadian Dollar' }
          ].map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label='Initial Balance'
          name='balance'
          type='number'
          fullWidth
          value={formData.balance}
          onChange={handleInputChange}
          sx={{ marginBottom: '16px' }}
        />

        {error && (
          <Typography
            variant='body2'
            sx={{ color: 'red', marginBottom: '16px', textAlign: 'center' }}
          >
            {error}
          </Typography>
        )}

        <Button
          variant='contained'
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            backgroundColor: themeColors.primary,
            color: themeColors.cardBackground,
            '&:hover': {
              backgroundColor: darkMode ? '#5C6BC0' : '#1976D2'
            }
          }}
        >
          {loading ? (
            <CircularProgress size={24} color='inherit' />
          ) : (
            'Create Account'
          )}
        </Button>
      </Box>
    </GlobalContainer>
  )
}

export default CreateAccount

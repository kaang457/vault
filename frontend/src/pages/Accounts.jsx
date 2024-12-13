import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import GlobalContainer from '../components/GlobalContainer'
import api from '../api'
import colors from '../styles/colors'

const Accounts = () => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Parse dark mode from local storage
    const storedDarkMode = localStorage.getItem('darkMode')
    setDarkMode(storedDarkMode === 'true')

    fetchAccounts()
  }, [])

  const fetchAccounts = () => {
    api
      .get('/api/users/accounts/')
      .then(res => res.data)
      .then(data => {
        setAccounts(data)
        setLoading(false)
      })
      .catch(err => {
        alert('Error fetching accounts: ' + err.message)
        setLoading(false)
      })
  }

  const navigate = useNavigate()
  const handleCreateAccount = () => {
    navigate('/create-account')
  }

  const themeColors = darkMode ? colors.dark : colors.light

  return (
    <GlobalContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          padding: '0 16px'
        }}
      >
        <Typography
          variant='h4'
          sx={{
            fontWeight: 'bold',
            color: darkMode ? 'white' : 'black'
          }}
        >
          Accounts
        </Typography>
        <Button
          variant='contained'
          onClick={handleCreateAccount}
          sx={{
            backgroundColor: themeColors.primary,
            color: themeColors.cardBackground,
            '&:hover': { backgroundColor: darkMode ? '#5C6BC0' : '#1976D2' }
          }}
        >
          Create Account
        </Button>
      </Box>

      {loading ? (
        <Typography
          variant='h6'
          sx={{ textAlign: 'center', color: themeColors.textSecondary }}
        >
          Loading accounts...
        </Typography>
      ) : accounts.length === 0 ? (
        <Typography
          variant='h6'
          sx={{ textAlign: 'center', color: themeColors.textSecondary }}
        >
          No accounts found.
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(auto-fill, minmax(320px, 1fr))'
            },
            gap: 3,
            padding: '24px',
            backgroundColor: themeColors.background
          }}
        >
          {accounts.map(account => (
            <Card
              key={account.id}
              sx={{
                boxShadow: darkMode
                  ? '0px 4px 12px rgba(255, 255, 255, 0.2)'
                  : '0px 4px 12px rgba(0, 0, 0, 0.15)',
                borderRadius: '16px',
                padding: '16px',
                backgroundColor: themeColors.cardBackground,
                color: themeColors.textPrimary,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: darkMode ? '1px solid #555' : '1px solid #ddd',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: darkMode
                    ? '0px 6px 16px rgba(255, 255, 255, 0.3)'
                    : '0px 6px 16px rgba(0, 0, 0, 0.2)'
                }
              }}
            >
              <CardContent>
                <Typography
                  variant='h6'
                  sx={{
                    marginBottom: '12px',
                    fontWeight: 'bold',
                    color: themeColors.textPrimary,
                    textTransform: 'uppercase'
                  }}
                >
                  {account.account_type} Account
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    color: themeColors.textSecondary,
                    marginBottom: '12px'
                  }}
                >
                  Account ID: {account.id}
                </Typography>
                <Typography
                  variant='h5'
                  sx={{
                    marginBottom: '12px',
                    fontWeight: 'bold',
                    color: themeColors.primary
                  }}
                >
                  {account.currency} {parseFloat(account.balance).toFixed(2)}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    color: themeColors.textSecondary,
                    marginBottom: '8px'
                  }}
                >
                  Created: {new Date(account.created_at).toLocaleDateString()}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: themeColors.textSecondary }}
                >
                  Updated: {new Date(account.updated_at).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', marginTop: 'auto' }}>
                <Button
                  size='medium'
                  variant='contained'
                  sx={{
                    backgroundColor: themeColors.primary,
                    color: themeColors.cardBackground,
                    borderRadius: '8px',
                    padding: '8px 24px',
                    '&:hover': {
                      backgroundColor: darkMode
                        ? '#5C6BC0'
                        : themeColors.hoverColor
                    }
                  }}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </GlobalContainer>
  )
}

export default Accounts

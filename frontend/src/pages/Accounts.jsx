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

const Accounts = ({ darkMode }) => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
            color: themeColors.textPrimary
          }}
        >
          Accounts
        </Typography>
        <Button
          variant='contained'
          color='primary'
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
              xs: '1fr', // Single column for very small screens
              sm: 'repeat(auto-fill, minmax(280px, 1fr))' // Responsive grid
            },
            gap: 2, // Adjust the gap between cards
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: darkMode
              ? themeColors.backgroundDark
              : themeColors.backgroundLight
          }}
        >
          {accounts.map(account => (
            <Card
              key={account.id}
              sx={{
                boxShadow: darkMode
                  ? '0px 4px 10px rgba(255, 255, 255, 0.2)'
                  : '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for light theme
                borderRadius: '12px',
                padding: '16px',
                backgroundColor: darkMode
                  ? themeColors.cardBackgroundDark
                  : themeColors.cardBackgroundLight,
                color: themeColors.textPrimary,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: darkMode ? '1px solid #444' : '1px solid #ccc' // Border for better contrast
              }}
            >
              <CardContent>
                <Typography
                  variant='h6'
                  sx={{
                    marginBottom: '8px',
                    fontWeight: 'bold',
                    color: themeColors.textPrimary
                  }}
                >
                  {account.account_type} Account
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    color: themeColors.textSecondary,
                    marginBottom: '8px'
                  }}
                >
                  Account ID: {account.id}
                </Typography>
                <Typography
                  variant='h5'
                  sx={{
                    marginBottom: '8px',
                    fontWeight: 'bold',
                    color: darkMode ? '#90CAF9' : themeColors.primary
                  }}
                >
                  {account.currency} {parseFloat(account.balance).toFixed(2)}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    color: themeColors.textSecondary,
                    marginBottom: '4px'
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
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                  size='small'
                  variant='contained'
                  sx={{
                    backgroundColor: themeColors.primary,
                    color: darkMode ? '#000' : themeColors.cardBackground,
                    borderRadius: '8px',
                    padding: '6px 16px',
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

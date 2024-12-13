import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  useTheme
} from '@mui/material'
import GlobalContainer from '../components/GlobalContainer'
import api from '../api'

const TransfersPage = () => {
  const theme = useTheme()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    amount: '',
    details: '',
    receiver: '',
    account: '',
    save_account: false,
    alias: ''
  })
  const [accounts, setAccounts] = useState([])
  const [preferredReceivers, setPreferredReceivers] = useState([])
  const [receiverSelectionType, setReceiverSelectionType] = useState('new')

  useEffect(() => {
    api
      .get('api/users/accounts/')
      .then(response => {
        setAccounts(response.data)
      })
      .catch(error => {
        console.error('Error fetching accounts:', error)
        alert('Unable to fetch accounts. Please try again later.')
      })

    api
      .get('api/account-preferences/')
      .then(response => {
        setPreferredReceivers(response.data)
      })
      .catch(error => {
        console.error('Error fetching preferred receivers:', error)
      })
  }, [])

  const handleInputChange = event => {
    const { name, value } = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const handleCheckboxChange = event => {
    const { checked } = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      save_account: checked,
      alias: ''
    }))
  }

  const handleReceiverSelectionTypeChange = event => {
    setReceiverSelectionType(event.target.value)
    setFormData(prevFormData => ({
      ...prevFormData,
      receiver: ''
    }))
  }

  const handleSubmit = () => {
    if (!formData.amount || !formData.receiver || !formData.account) {
      alert('Please fill out all required fields (amount, receiver, account).')
      return
    }

    setIsSubmitting(true)

    api
      .post('api/transactions/', formData)
      .then(response => {
        console.log('API Response:', response)
        alert('Form submitted successfully!')
        setFormData({
          amount: '',
          details: '',
          receiver: '',
          account: '',
          save_account: false,
          alias: ''
        })

        api
          .get('api/users/accounts/')
          .then(response => {
            setAccounts(response.data)
          })
          .catch(error => {
            console.error('Error updating accounts:', error)
            alert('Failed to refresh account data. Please reload the page.')
          })
      })
      .catch(error => {
        console.error('Error submitting form:', error)
        alert('An error occurred while submitting the form. Please try again.')
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <GlobalContainer>
      <Typography
        variant='h4'
        sx={{
          color: theme.palette.text.primary,
          fontWeight: 'bold',
          marginBottom: '16px',
          alignContent: 'center'
        }}
      >
        Transfer Operations
      </Typography>

      <Box
        sx={{
          backgroundColor:
            theme.palette.mode === 'dark' ? '#2E2E2E' : '#FFFFFF',
          padding: '24px',
          borderRadius: '8px',
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0px 4px 8px rgba(255,255,255,0.1)'
              : '0px 4px 8px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}
      >
        <Typography
          variant='h6'
          sx={{ marginBottom: '16px', color: theme.palette.text.primary }}
        >
          Fill Transfer Details
        </Typography>

        {/* Account Selection */}
        <FormControl fullWidth sx={{ marginBottom: '16px' }}>
          <InputLabel id='account-select-label'>Select Account</InputLabel>
          <Select
            labelId='account-select-label'
            id='account-select'
            name='account'
            value={formData.account}
            onChange={handleInputChange}
            label='Select Account'
            sx={{
              color: theme.palette.text.primary,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.divider
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main
                }
              }
            }}
          >
            {accounts.map(account => (
              <MenuItem key={account.id} value={account.id}>
                {`Account ID: ${account.id} (Balance: ${account.balance.toFixed(
                  2
                )} $)`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Receiver Selection Type */}
        <FormControl component='fieldset' sx={{ marginBottom: '16px' }}>
          <RadioGroup
            row
            name='receiverSelectionType'
            value={receiverSelectionType}
            onChange={handleReceiverSelectionTypeChange}
          >
            <FormControlLabel
              value='new'
              control={<Radio />}
              label='New Receiver'
            />
            <FormControlLabel
              value='saved'
              control={<Radio />}
              label='Saved Receiver'
            />
          </RadioGroup>
        </FormControl>

        {/* Receiver Field */}
        {receiverSelectionType === 'new' ? (
          <TextField
            label='Receiver'
            name='receiver'
            variant='outlined'
            fullWidth
            sx={{
              marginBottom: '16px',
              input: { color: theme.palette.text.primary },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.divider
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main
                }
              }
            }}
            value={formData.receiver}
            onChange={handleInputChange}
          />
        ) : (
          <FormControl fullWidth sx={{ marginBottom: '16px' }}>
            <InputLabel id='preferred-receiver-select-label'>
              Select Saved Receiver
            </InputLabel>
            <Select
              labelId='preferred-receiver-select-label'
              id='preferred-receiver-select'
              name='receiver'
              value={formData.receiver}
              onChange={handleInputChange}
              label='Select Saved Receiver'
              sx={{
                color: theme.palette.text.primary,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.divider
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main
                  }
                }
              }}
            >
              {preferredReceivers.map(receiver => (
                <MenuItem key={receiver.id} value={receiver.receiver}>
                  {`Receiver ID: ${receiver.receiver} (Alias: ${receiver.alias})`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Alias Field */}
        {formData.save_account && (
          <TextField
            label='Alias (optional)'
            name='alias'
            variant='outlined'
            fullWidth
            sx={{
              marginBottom: '16px',
              input: { color: theme.palette.text.primary },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.divider
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main
                }
              }
            }}
            value={formData.alias}
            onChange={handleInputChange}
          />
        )}

        {/* Other Fields */}
        <TextField
          label='Amount ($)'
          name='amount'
          type='number'
          variant='outlined'
          fullWidth
          sx={{
            marginBottom: '16px',
            input: { color: theme.palette.text.primary },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.divider
              },
              '&:hover fieldset': {
                borderColor: theme.palette.primary.main
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main
              }
            }
          }}
          value={formData.amount}
          onChange={handleInputChange}
        />

        <TextField
          label='Details'
          name='details'
          variant='outlined'
          fullWidth
          multiline
          rows={3}
          sx={{
            marginBottom: '16px',
            input: { color: theme.palette.text.primary },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.divider
              },
              '&:hover fieldset': {
                borderColor: theme.palette.primary.main
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main
              }
            }
          }}
          value={formData.details}
          onChange={handleInputChange}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.save_account}
              onChange={handleCheckboxChange}
              name='save_account'
              sx={{
                color: theme.palette.primary.main,
                '&.Mui-checked': { color: theme.palette.primary.main }
              }}
            />
          }
          label='Save this account as a preferred account'
        />

        <Button
          variant='contained'
          disabled={isSubmitting}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': { backgroundColor: theme.palette.primary.dark }
          }}
          fullWidth
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Box>
    </GlobalContainer>
  )
}

export default TransfersPage

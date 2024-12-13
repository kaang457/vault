import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Grid
} from '@mui/material'
import GlobalContainer from '../components/GlobalContainer'

const Payments = () => {
  const [serviceType, setServiceType] = useState('')
  const [company, setCompany] = useState('')
  const [customerNumber, setCustomerNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [upcomingBills, setUpcomingBills] = useState(300.0)
  const [lastPayment, setLastPayment] = useState(150.0)
  const [totalPayments, setTotalPayments] = useState(5420.0)
  const [currentBalance, setCurrentBalance] = useState(1200.0)
  const [openDialog, setOpenDialog] = useState(false)
  const [error, setError] = useState('')

  const services = {
    electricity: [
      'Electric Company A',
      'Electric Company B',
      'Electric Company C'
    ],
    phone: ['Phone Carrier X', 'Phone Carrier Y', 'Phone Carrier Z'],
    water: ['Water Provider 1', 'Water Provider 2', 'Water Provider 3'],
    gas: ['Gas Company 1', 'Gas Company 2', 'Gas Company 3']
  }

  const handlePayment = () => {
    if (!serviceType || !company || !customerNumber || !amount) {
      setError('All fields are required.')
      return
    }

    const paymentAmount = parseFloat(amount)

    if (paymentAmount > upcomingBills) {
      setError('Payment amount cannot exceed upcoming bills.')
      return
    }

    // Update payment metrics
    setUpcomingBills(prev => prev - paymentAmount)
    setLastPayment(paymentAmount)
    setTotalPayments(prev => prev + paymentAmount)
    setCurrentBalance(prev => prev - paymentAmount)

    alert(
      `Payment of $${paymentAmount} to ${company} for ${serviceType} (Customer No: ${customerNumber}) completed successfully!`
    )

    setOpenDialog(false)
    resetForm()
  }

  const resetForm = () => {
    setServiceType('')
    setCompany('')
    setCustomerNumber('')
    setAmount('')
    setError('')
  }

  const handleDialogClose = () => {
    setOpenDialog(false)
    resetForm()
  }

  return (
    <GlobalContainer>
      <Box
        sx={{
          padding: '32px',
          backgroundColor: '#f9fafc',
          minHeight: '100vh'
        }}
      >
        <Typography
          variant='h4'
          sx={{ fontWeight: 'bold', marginBottom: '24px', textAlign: 'center' }}
        >
          Payment Dashboard
        </Typography>

        <Grid container spacing={3} sx={{ marginBottom: '32px' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px'
              }}
            >
              <CardContent>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  Current Balance
                </Typography>
                <Typography
                  variant='h4'
                  sx={{ color: '#4caf50', fontWeight: 'bold' }}
                >
                  ${currentBalance.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px'
              }}
            >
              <CardContent>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  Total Payments
                </Typography>
                <Typography
                  variant='h4'
                  sx={{ color: '#2196f3', fontWeight: 'bold' }}
                >
                  ${totalPayments.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px'
              }}
            >
              <CardContent>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  Upcoming Bills
                </Typography>
                <Typography
                  variant='h4'
                  sx={{ color: '#ff9800', fontWeight: 'bold' }}
                >
                  ${upcomingBills.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px'
              }}
            >
              <CardContent>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  Last Payment
                </Typography>
                <Typography
                  variant='h4'
                  sx={{ color: '#f44336', fontWeight: 'bold' }}
                >
                  ${lastPayment.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setOpenDialog(true)}
            sx={{
              fontSize: '18px',
              padding: '12px 24px',
              marginBottom: '16px'
            }}
          >
            Make a Payment
          </Button>
        </Box>

        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Make a Payment
          </DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ marginBottom: '16px' }}>
              <InputLabel>Select Service Type</InputLabel>
              <Select
                value={serviceType}
                onChange={e => setServiceType(e.target.value)}
              >
                <MenuItem value='electricity'>Electricity</MenuItem>
                <MenuItem value='phone'>Phone</MenuItem>
                <MenuItem value='water'>Water</MenuItem>
                <MenuItem value='gas'>Gas</MenuItem>
              </Select>
            </FormControl>

            {serviceType && (
              <>
                <FormControl fullWidth sx={{ marginBottom: '16px' }}>
                  <InputLabel>Select Company</InputLabel>
                  <Select
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                  >
                    {services[serviceType].map((comp, index) => (
                      <MenuItem key={index} value={comp}>
                        {comp}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label='Customer Number'
                  value={customerNumber}
                  onChange={e => setCustomerNumber(e.target.value)}
                  sx={{ marginBottom: '16px' }}
                />
              </>
            )}

            <TextField
              fullWidth
              label='Amount'
              type='number'
              value={amount}
              onChange={e => setAmount(e.target.value)}
              sx={{ marginBottom: '16px' }}
            />

            {error && (
              <Typography
                color='error'
                sx={{ marginBottom: '16px', textAlign: 'center' }}
              >
                {error}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDialogClose}
              color='secondary'
              sx={{ fontWeight: 'bold' }}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              color='primary'
              sx={{ fontWeight: 'bold' }}
            >
              Pay
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </GlobalContainer>
  )
}

export default Payments

import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import GlobalContainer from '../components/GlobalContainer'

const Loans = () => {
  const [currentLoan, setCurrentLoan] = useState(0)
  const [totalPaid, setTotalPaid] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const [loanAmount, setLoanAmount] = useState('')
  const [income, setIncome] = useState('')
  const [creditScore, setCreditScore] = useState('')
  const [loanDuration, setLoanDuration] = useState('')
  const [error, setError] = useState('')

  const handleApplyForLoan = () => {
    if (!loanAmount || !income || !creditScore || !loanDuration) {
      setError('All fields are required.')
      return
    }

    if (parseInt(creditScore) < 600) {
      setError('Your credit score must be at least 600 to apply for a loan.')
      return
    }

    if (parseFloat(loanAmount) > parseFloat(income) * 0.5) {
      setError('Loan amount must not exceed 50% of your income.')
      return
    }

    if (parseInt(loanDuration) <= 0) {
      setError('Loan duration must be greater than 0.')
      return
    }

    const interestRate = parseInt(loanDuration) <= 12 ? 0.05 : 0.1 // 5% interest for <= 12 months, 10% for > 12 months
    const interest = parseFloat(loanAmount) * interestRate

    // Update loan details
    setCurrentLoan(prevLoan => prevLoan + parseFloat(loanAmount) + interest)
    setTotalPaid(prevPaid => prevPaid + interest) // Simulating total interest to be paid upfront
    setOpenDialog(false)
    setLoanAmount('')
    setIncome('')
    setCreditScore('')
    setLoanDuration('')
    setError('')
    alert('Loan application successful!')
  }

  return (
    <GlobalContainer>
      <Box
        sx={{
          padding: '32px',
          backgroundColor: '#f4f4f4',
          minHeight: '100vh'
        }}
      >
        {/* Summary Cards */}
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            flexWrap: 'wrap',
            marginBottom: '32px'
          }}
        >
          {[
            // Summary card data
            { title: 'Current Loan', value: `$${currentLoan.toFixed(2)}` },
            { title: 'Total Paid', value: `$${totalPaid.toFixed(2)}` }
          ].map((item, index) => (
            <Card
              key={index}
              sx={{
                flex: '1 1 calc(50% - 16px)',
                textAlign: 'center',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                borderRadius: '8px'
              }}
            >
              <CardContent>
                <Typography variant='subtitle1' sx={{ marginBottom: '8px' }}>
                  {item.title}
                </Typography>
                <Typography
                  variant='h6'
                  sx={{ fontWeight: 'bold', color: '#333' }}
                >
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Apply for Loan Button */}
        <Box sx={{ textAlign: 'center', marginBottom: '32px' }}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setOpenDialog(true)}
          >
            Apply for New Loan
          </Button>
        </Box>

        {/* Loan Application Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Apply for a New Loan</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label='Loan Amount'
              type='number'
              value={loanAmount}
              onChange={e => setLoanAmount(e.target.value)}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              fullWidth
              label='Monthly Income'
              type='number'
              value={income}
              onChange={e => setIncome(e.target.value)}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              fullWidth
              label='Credit Score'
              type='number'
              value={creditScore}
              onChange={e => setCreditScore(e.target.value)}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              fullWidth
              label='Loan Duration (in months)'
              type='number'
              value={loanDuration}
              onChange={e => setLoanDuration(e.target.value)}
              sx={{ marginBottom: '16px' }}
            />
            {error && (
              <Typography color='error' sx={{ marginBottom: '16px' }}>
                {error}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color='secondary'>
              Cancel
            </Button>
            <Button onClick={handleApplyForLoan} color='primary'>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </GlobalContainer>
  )
}

export default Loans

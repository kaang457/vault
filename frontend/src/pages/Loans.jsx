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
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress
} from '@mui/material'
import GlobalContainer from '../components/GlobalContainer'
import api from '../api'

const Loans = () => {
  const [currentLoan, setCurrentLoan] = useState(0)
  const [totalPaid, setTotalPaid] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false)
  const [loanAmount, setLoanAmount] = useState('')
  const [income, setIncome] = useState('')
  const [loanDuration, setLoanDuration] = useState('')
  const [paymentAmount, setPaymentAmount] = useState('')
  const [selectedLoan, setSelectedLoan] = useState('')
  const [selectedAccount, setSelectedAccount] = useState('')
  const [accounts, setAccounts] = useState([])
  const [creditScore, setCreditScore] = useState('')
  const [error, setError] = useState('')
  const [loadingAccounts, setLoadingAccounts] = useState(false)
  const [loadingLoans, setLoadingLoans] = useState(false)
  const [loadingApply, setLoadingApply] = useState(false)
  const [loadingPayment, setLoadingPayment] = useState(false) // Added loading state for payments
  const [loans, setLoans] = useState([])

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoadingAccounts(true)
        const response = await api.get('/api/users/accounts/')
        setAccounts(response.data)
      } catch (error) {
        console.error('Failed to fetch accounts:', error)
        setError('Failed to load accounts. Please try again.')
      } finally {
        setLoadingAccounts(false)
      }
    }
    fetchAccounts()
  }, [])

  const handleAccountChange = async accountId => {
    setSelectedAccount(accountId)
    setError('')
    const selected = accounts.find(account => account.id === accountId)
    if (selected) {
      setCreditScore(selected.credit_score || '')
    } else {
      setCreditScore('')
    }

    try {
      setLoadingLoans(true)
      const response = await api.get(`/api/loans/?account_id=${accountId}`)
      setLoans(response.data)

      const totalCurrentLoan = response.data.reduce(
        (sum, loan) => sum + parseFloat(loan.loan_amount),
        0
      )
      setCurrentLoan(totalCurrentLoan)
    } catch (error) {
      console.error('Failed to fetch loans:', error)
      setError('Failed to load loans for this account.')
    } finally {
      setLoadingLoans(false)
    }
  }

  const handleApplyForLoan = async () => {
    if (!loanAmount || !income || !loanDuration) {
      setError('All fields are required.')
      return
    }

    const creditScoreInt = parseInt(creditScore)
    if (creditScoreInt < 600) {
      setError('Your credit score must be at least 600 to apply for a loan.')
      return
    }

    const maxLoan = creditScoreInt * 100
    if (parseFloat(loanAmount) > maxLoan) {
      setError(`Loan amount exceeds your allowed limit of $${maxLoan}.`)
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

    try {
      setLoadingApply(true)
      const response = await api.post('/api/loans/', {
        loan_amount: loanAmount,
        loan_duration: loanDuration,
        monthly_income: income,
        account_id: selectedAccount
      })

      const updatedLoans = [...loans, response.data]
      setLoans(updatedLoans)

      const totalCurrentLoan = updatedLoans.reduce(
        (sum, loan) => sum + parseFloat(loan.loan_amount),
        0
      )
      setCurrentLoan(totalCurrentLoan)

      setOpenDialog(false)
      setLoanAmount('')
      setIncome('')
      setLoanDuration('')
      setError('')
      alert('Loan application successful!')
    } catch (error) {
      console.error('Loan application failed:', error)
      setError(
        error.response?.data?.error ||
          'Failed to apply for loan. Please try again.'
      )
    } finally {
      setLoadingApply(false)
    }
  }

  const handleOpenPaymentDialog = loanId => {
    setSelectedLoan(loanId)
    setOpenPaymentDialog(true)
  }

  const handleLoanPayment = async () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      setError('Payment amount must be greater than 0.')
      return
    }

    try {
      setLoadingPayment(true)
      const response = await api.post('/api/loans/pay/', {
        loan_id: selectedLoan,
        payment_amount: paymentAmount
      })

      const updatedLoans = loans.map(loan =>
        loan.id === response.data.loan_id
          ? { ...loan, loan_amount: response.data.remaining_balance }
          : loan
      )
      setLoans(updatedLoans)

      const totalCurrentLoan = updatedLoans.reduce(
        (sum, loan) => sum + parseFloat(loan.loan_amount),
        0
      )
      setCurrentLoan(totalCurrentLoan)

      setOpenPaymentDialog(false)
      setPaymentAmount('')
      setError('')
      alert('Loan payment successful!')
    } catch (error) {
      console.error('Loan payment failed:', error)
      setError(
        error.response?.data?.error ||
          'Failed to process payment. Please try again.'
      )
    } finally {
      setLoadingPayment(false)
    }
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
        {/* Show loading spinner while fetching accounts */}
        {loadingAccounts ? (
          <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
            <CircularProgress />
            <Typography variant='body1'>Loading accounts...</Typography>
          </Box>
        ) : (
          <>
            {/* Render Summary Cards */}
            {selectedAccount && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 4,
                  flexWrap: 'wrap',
                  marginBottom: '32px'
                }}
              >
                {[
                  {
                    title: 'Current Loan',
                    value: `$${currentLoan.toFixed(2)}`
                  },
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
                      <Typography
                        variant='subtitle1'
                        sx={{ marginBottom: '8px' }}
                      >
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
            )}

            {/* Account Selection */}
            <Box sx={{ marginBottom: '16px' }}>
              <FormControl fullWidth>
                <InputLabel>Select Account</InputLabel>
                <Select
                  value={selectedAccount}
                  onChange={e => handleAccountChange(e.target.value)}
                >
                  {accounts.map(account => (
                    <MenuItem key={account.id} value={account.id}>
                      {`${account.account_type} (${account.currency}) - Balance: $${account.balance}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {error && (
                <Typography color='error' sx={{ marginTop: '8px' }}>
                  {error}
                </Typography>
              )}
            </Box>

            {/* Loans List */}
            {loadingLoans ? (
              <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
                <CircularProgress />
                <Typography variant='body1'>Loading loans...</Typography>
              </Box>
            ) : loans.length > 0 ? (
              <Box sx={{ marginTop: '32px' }}>
                <Typography variant='h6' sx={{ marginBottom: '16px' }}>
                  Existing Loans
                </Typography>
                {loans.map((loan, index) => (
                  <Card
                    key={index}
                    sx={{
                      marginBottom: '16px',
                      padding: '16px',
                      boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                      borderRadius: '8px'
                    }}
                  >
                    <Typography variant='body1'>
                      Loan Amount: ${loan.loan_amount}
                    </Typography>
                    <Typography variant='body1'>
                      Loan Duration: {loan.loan_duration} months
                    </Typography>
                    <Typography variant='body1'>
                      Created At:{' '}
                      {new Date(loan.created_at).toLocaleDateString()}
                    </Typography>
                    <Button
                      variant='outlined'
                      color='primary'
                      sx={{ marginTop: '8px' }}
                      onClick={() => handleOpenPaymentDialog(loan.id)}
                    >
                      Pay Loan
                    </Button>
                  </Card>
                ))}
              </Box>
            ) : (
              <Typography
                variant='body1'
                sx={{ marginTop: '32px', textAlign: 'center' }}
              >
                No loans available.
              </Typography>
            )}

            {/* Apply for Loan Button */}
            <Box sx={{ textAlign: 'center', marginTop: '32px' }}>
              <Button
                variant='contained'
                color='primary'
                onClick={() => setOpenDialog(true)}
                disabled={!selectedAccount || loadingLoans}
              >
                Apply for New Loan
              </Button>
            </Box>
          </>
        )}

        {/* Loan Application Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Apply for a New Loan</DialogTitle>
          <DialogContent>
            <Typography variant='body1' sx={{ marginBottom: '16px' }}>
              Your Credit Score: {creditScore || 'Loading...'}
            </Typography>
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
            <Button
              onClick={handleApplyForLoan}
              color='primary'
              disabled={loadingApply}
            >
              {loadingApply ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Loan Payment Dialog */}
        <Dialog
          open={openPaymentDialog}
          onClose={() => setOpenPaymentDialog(false)}
        >
          <DialogTitle>Pay Loan</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label='Payment Amount'
              type='number'
              value={paymentAmount}
              onChange={e => setPaymentAmount(e.target.value)}
              sx={{ marginBottom: '16px' }}
            />
            {error && (
              <Typography color='error' sx={{ marginBottom: '16px' }}>
                {error}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenPaymentDialog(false)}
              color='secondary'
            >
              Cancel
            </Button>
            <Button
              onClick={handleLoanPayment}
              color='primary'
              disabled={loadingPayment}
            >
              {loadingPayment ? <CircularProgress size={24} /> : 'Pay'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </GlobalContainer>
  )
}

export default Loans

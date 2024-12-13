import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material'
import api from '../api'
import mockStocks from '../data/mockData'
import GlobalContainer from '../components/GlobalContainer'
import colors from '../styles/colors'

const Investments = () => {
  const [portfolio, setPortfolio] = useState([])
  const [accounts, setAccounts] = useState([])
  const [selectedStock, setSelectedStock] = useState('')
  const [quantity, setQuantity] = useState('')
  const [selectedAccount, setSelectedAccount] = useState('')
  const [error, setError] = useState('')
  const [noInvestmentAccount, setNoInvestmentAccount] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Parse dark mode from local storage
    const storedDarkMode = localStorage.getItem('darkMode')
    setDarkMode(storedDarkMode === 'true')

    api
      .get('/api/stocks/portfolio/')
      .then(response => {
        setPortfolio(response.data)
      })
      .catch(err => {
        console.error('Error fetching portfolio:', err)
      })

    api
      .get('/api/users/accounts/')
      .then(response => {
        setAccounts(response.data)
        const hasInvestmentAccount = response.data.some(
          account => account.account_type === 'INVESTMENT'
        )
        if (!hasInvestmentAccount) {
          setNoInvestmentAccount(true)
        }
      })
      .catch(err => {
        console.error('Error fetching accounts:', err)
      })
  }, [])

  const themeColors = darkMode ? colors.dark : colors.light

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const handleBuy = () => {
    if (
      !selectedStock ||
      !quantity ||
      parseInt(quantity) <= 0 ||
      !selectedAccount
    ) {
      setError('Please select a stock, quantity, and account.')
      return
    }

    const stock = mockStocks.find(s => s.symbol === selectedStock)

    if (!stock) {
      setError('Selected stock not found.')
      return
    }

    api
      .post('/api/stocks/buy/', {
        symbol: selectedStock,
        quantity: parseInt(quantity),
        account_id: selectedAccount,
        price: stock.price
      })
      .then(() => {
        api
          .get('/api/stocks/portfolio/')
          .then(response => setPortfolio(response.data))
          .catch(err => console.error('Error refreshing portfolio:', err))
        api
          .get('/api/users/accounts/')
          .then(response => setAccounts(response.data))
          .catch(err => console.error('Error refreshing accounts:', err))

        setError('')
        setSnackbar({
          open: true,
          message: `Successfully bought ${quantity} shares of ${selectedStock}`,
          severity: 'success'
        })
      })
      .catch(err => {
        console.error('Error buying stock:', err)
        setSnackbar({
          open: true,
          message: 'Failed to buy stock. Please try again later.',
          severity: 'error'
        })
      })
  }

  const handleSell = () => {
    if (
      !selectedStock ||
      !quantity ||
      parseInt(quantity) <= 0 ||
      !selectedAccount
    ) {
      setError('Please select a stock, quantity, and account.')
      return
    }

    const stock = mockStocks.find(s => s.symbol === selectedStock)

    api
      .post('/api/stocks/sell/', {
        symbol: selectedStock,
        quantity: parseInt(quantity),
        account_id: selectedAccount,
        price: stock.price
      })
      .then(() => {
        api
          .get('/api/stocks/portfolio/')
          .then(response => setPortfolio(response.data))
          .catch(err => console.error('Error refreshing portfolio:', err))
        api
          .get('/api/users/accounts/')
          .then(response => setAccounts(response.data))
          .catch(err => console.error('Error refreshing accounts:', err))

        setError('')
        setSnackbar({
          open: true,
          message: `Successfully sold ${quantity} shares of ${selectedStock}`,
          severity: 'success'
        })
      })
      .catch(err => {
        console.error('Error selling stock:', err)
        setSnackbar({
          open: true,
          message: 'Failed to sell stock. Please try again later.',
          severity: 'error'
        })
      })
  }

  return (
    <GlobalContainer>
      <Box
        sx={{
          padding: '32px',
          backgroundColor: themeColors.background,
          minHeight: '100vh'
        }}
      >
        <Typography
          variant='h4'
          sx={{
            marginBottom: '24px',
            fontWeight: 'bold',
            color: themeColors.textPrimary
          }}
        >
          Investments
        </Typography>

        {/* Real-Time Stock Data */}
        <Typography
          variant='h6'
          sx={{ marginBottom: '16px', color: themeColors.textPrimary }}
        >
          Real-Time Stock Data
        </Typography>
        <TableContainer component={Paper} sx={{ marginBottom: '32px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockStocks.map((stock, index) => (
                <TableRow key={index}>
                  <TableCell>{stock.symbol}</TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell>${stock.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Buy/Sell Form */}
        <Box sx={{ marginBottom: '32px' }}>
          <Typography
            variant='h6'
            sx={{ marginBottom: '16px', color: themeColors.textPrimary }}
          >
            Buy/Sell Stocks
          </Typography>
          <TextField
            fullWidth
            select
            label='Select Stock'
            value={selectedStock}
            onChange={e => setSelectedStock(e.target.value)}
            sx={{ marginBottom: '16px' }}
            SelectProps={{ native: true }}
          >
            <option value=''></option>
            {mockStocks.map(stock => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.symbol}
              </option>
            ))}
          </TextField>
          <TextField
            fullWidth
            label='Quantity'
            type='number'
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            sx={{ marginBottom: '16px' }}
          />
          <FormControl fullWidth sx={{ marginBottom: '16px' }}>
            <InputLabel id='account-select-label'>Select Account</InputLabel>
            <Select
              labelId='account-select-label'
              value={selectedAccount}
              onChange={e => setSelectedAccount(e.target.value)}
            >
              {accounts.map(account => (
                <MenuItem key={account.id} value={account.id}>
                  {account.account_type} - ${account.balance.toFixed(2)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {error && (
            <Typography color='error' sx={{ marginBottom: '16px' }}>
              {error}
            </Typography>
          )}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant='contained'
              sx={{
                backgroundColor: themeColors.primary,
                color: themeColors.cardBackground,
                '&:hover': { backgroundColor: themeColors.hoverColor }
              }}
              onClick={handleBuy}
            >
              Buy
            </Button>
            <Button
              variant='contained'
              sx={{
                backgroundColor: themeColors.secondary,
                color: themeColors.cardBackground,
                '&:hover': { backgroundColor: themeColors.hoverColor }
              }}
              onClick={handleSell}
            >
              Sell
            </Button>
          </Box>
        </Box>

        {/* User Portfolio */}
        <Typography
          variant='h6'
          sx={{ marginBottom: '16px', color: themeColors.textPrimary }}
        >
          Your Portfolio
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolio.map((stock, index) => (
                <TableRow key={index}>
                  <TableCell>{stock.stock_symbol}</TableCell>
                  <TableCell>{stock.total_quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* No Investment Account Dialog */}
        <Dialog
          open={noInvestmentAccount}
          onClose={() => setNoInvestmentAccount(false)}
        >
          <DialogTitle>Investment Account Required</DialogTitle>
          <DialogContent>
            <Typography>
              You do not have any investment accounts. Please create an
              investment account to buy stocks.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setNoInvestmentAccount(false)}
              sx={{ color: themeColors.primary }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </GlobalContainer>
  )
}

export default Investments

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
  Paper
} from '@mui/material'
import api from '../api'
import mockStocks from '../data/mockData'
import GlobalContainer from '../components/GlobalContainer'

const Investments = () => {
  const [portfolio, setPortfolio] = useState([])
  const [selectedStock, setSelectedStock] = useState('')
  const [quantity, setQuantity] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get('/api/stocks/portfolio/')
      .then(response => {
        setPortfolio(response.data)
      })
      .catch(err => {
        console.error('Error fetching portfolio:', err)
      })
  }, [])

  // Handle stock purchase
  const handleBuy = () => {
    if (!selectedStock || !quantity || parseInt(quantity) <= 0) {
      setError('Please select a stock and enter a valid quantity.')
      return
    }

    api
      .post('/api/stocks/buy/', {
        symbol: selectedStock,
        quantity: parseInt(quantity)
      })
      .then(() => {
        // Refresh portfolio
        api
          .get('/api/stocks/portfolio/')
          .then(response => setPortfolio(response.data))
          .catch(err => console.error('Error refreshing portfolio:', err))

        setError('')
        alert(`Successfully bought ${quantity} shares of ${selectedStock}`)
      })
      .catch(err => {
        console.error('Error buying stock:', err)
        setError('Failed to buy stock. Please try again later.')
      })
  }

  // Handle stock sale
  const handleSell = () => {
    if (!selectedStock || !quantity || parseInt(quantity) <= 0) {
      setError('Please select a stock and enter a valid quantity.')
      return
    }

    api
      .post('/api/stocks/sell/', {
        symbol: selectedStock,
        quantity: parseInt(quantity)
      })
      .then(() => {
        // Refresh portfolio
        api
          .get('/api/stocks/portfolio/')
          .then(response => setPortfolio(response.data))
          .catch(err => console.error('Error refreshing portfolio:', err))

        setError('')
        alert(`Successfully sold ${quantity} shares of ${selectedStock}`)
      })
      .catch(err => {
        console.error('Error selling stock:', err)
        setError('Failed to sell stock. Please try again later.')
      })
  }

  return (
    <GlobalContainer>
      <Box
        sx={{
          padding: '32px',
          backgroundColor: 'background.default',
          minHeight: '100vh'
        }}
      >
        <Typography
          variant='h4'
          sx={{ marginBottom: '24px', fontWeight: 'bold' }}
        >
          Investments
        </Typography>

        {/* Real-Time Stock Data */}
        <Typography variant='h6' sx={{ marginBottom: '16px' }}>
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
          <Typography variant='h6' sx={{ marginBottom: '16px' }}>
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
          {error && (
            <Typography color='error' sx={{ marginBottom: '16px' }}>
              {error}
            </Typography>
          )}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant='contained' color='primary' onClick={handleBuy}>
              Buy
            </Button>
            <Button variant='contained' color='secondary' onClick={handleSell}>
              Sell
            </Button>
          </Box>
        </Box>

        {/* User Portfolio */}
        <Typography variant='h6' sx={{ marginBottom: '16px' }}>
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
                  {/* Ensure it maps correctly */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </GlobalContainer>
  )
}

export default Investments

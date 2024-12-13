import React, { useState, useEffect } from 'react'
import { Box, Typography, Card, CardContent, Tabs, Tab } from '@mui/material'
import Chart from 'react-apexcharts'
import { PieChart } from '@mui/x-charts/PieChart'
import GlobalContainer from '../components/GlobalContainer'
import colors from '../styles/colors'
import api from '../api'

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [balance, setBalance] = useState(0)
  const [savings, setSavings] = useState(0)
  const [loading, setLoading] = useState(true)
  const [accounts, setAccounts] = useState([])
  const [monthlyExpenses, setMonthlyExpenses] = useState(15000)
  const [pieChartData, setPieChartData] = useState([])
  const [tabValue, setTabValue] = useState(0)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode')
    setDarkMode(storedDarkMode === 'true')
  }, [])

  const themeColors = darkMode ? colors.dark : colors.light

  useEffect(() => {
    getAccounts()
    getTransactions()
  }, [])

  const pieParams = {
    height: 200,
    margin: { right: 5 },
    slotProps: { legend: { hidden: true } },
    colors: [themeColors.primary, themeColors.secondary]
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const getAccounts = async () => {
    try {
      const res = await api.get('/api/users/accounts/')
      const data = res.data

      const exchangeRates = {
        USD: 1,
        EUR: 1.1,
        GBP: 1.3,
        TL: 0.036,
        JPY: 0.007,
        CAD: 0.75
      }

      let totalBalance = 0
      let totalSavings = 0
      const typeBalances = {}

      data.forEach(account => {
        const { account_type, balance, currency } = account
        const exchangeRate = exchangeRates[currency] || 1
        const amountInUSD = parseFloat(balance) * exchangeRate

        const formattedAccountType =
          account_type.charAt(0).toUpperCase() +
          account_type.slice(1).toLowerCase()

        if (account_type === 'SAVINGS') {
          totalSavings += amountInUSD
        } else {
          totalBalance += amountInUSD
        }
        if (!typeBalances[formattedAccountType]) {
          typeBalances[formattedAccountType] = 0
        }
        typeBalances[formattedAccountType] += amountInUSD
      })

      setBalance(totalBalance.toFixed(2))
      setSavings(totalSavings.toFixed(2))
      setPieChartData(
        Object.entries(typeBalances).map(([account_type, value]) => ({
          id: account_type,
          label: account_type,
          value
        }))
      )
      setLoading(false)
    } catch (err) {
      console.error('Error fetching accounts or calculating balance:', err)
      alert('Failed to load account data. Please try again later.')
    }
  }

  const getTransactions = async () => {
    try {
      const res = await api.get('/api/user-transactions/')
      setTransactions(res.data)
    } catch (err) {
      console.error('Error fetching transactions:', err)
    }
  }

  return (
    <GlobalContainer>
      {/* Tabs */}
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab
          label='Overview'
          sx={{
            color: themeColors.textPrimary,
            fontFamily: 'RobotoCondensed-Regular',
            fontSize: 20
          }}
        />
        <Tab
          label='Transactions'
          sx={{
            color: themeColors.textPrimary,
            fontFamily: 'RobotoCondensed-Regular',
            fontSize: 20
          }}
        />
      </Tabs>

      {tabValue === 0 && (
        <>
          {/* Balance, Income, Savings Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '16px',
              gap: 2,
              flexWrap: 'wrap'
            }}
          >
            {[
              {
                title: 'Balance',
                value: loading ? 'Loading...' : `$${balance}`,
                change: '+2.5%',
                changeColor: themeColors.primary,
                description: 'Compared to $21,430 last year'
              },
              {
                title: 'Savings',
                value: loading ? 'Loading...' : `$${savings}`,
                change: '-1.5%',
                changeColor: themeColors.secondary
              },
              {
                title: 'Income',
                value: '$20,199',
                change: '+0.5%',
                changeColor: themeColors.primary
              },
              {
                title: 'Monthly Expenses',
                value: `$${monthlyExpenses}`,
                change: '+1.2%',
                changeColor: themeColors.secondary
              }
            ].map((item, index) => (
              <Card
                key={index}
                sx={{
                  flex: '1 1 calc(15% - 6px)',
                  padding: '2px',
                  height: '70px',
                  textAlign: 'center',
                  boxShadow: '0px 2px 4px rgba(0,0,0,0.15)',
                  backgroundColor: themeColors.cardBackground,
                  color: themeColors.textPrimary,
                  fontFamily: 'Archivo_Condensed-Medium',
                  fontSize: 20
                }}
              >
                <CardContent>
                  <Typography
                    variant='subtitle2'
                    sx={{
                      marginBottom: '0px',
                      fontFamily: 'Archivo_Condensed-Medium',
                      fontSize: 17
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant='h6'
                    sx={{
                      marginBottom: '2px',
                      fontWeight: 'bold',
                      fontFamily: 'Archivo_Condensed-Bold'
                    }}
                  >
                    {item.value}
                  </Typography>
                  <Typography
                    variant='caption'
                    sx={{
                      marginBottom: '2px',
                      color: item.changeColor,
                      fontFamily: 'Archivo_Condensed-Regular'
                    }}
                  >
                    {item.change}
                  </Typography>
                  <Typography
                    variant='caption'
                    sx={{
                      color: themeColors.textSecondary,
                      fontFamily: 'Archivo_Condensed-Regular'
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Chart Section */}
          <Box
            sx={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
              backgroundColor: themeColors.cardBackground
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 4
              }}
            >
              {/* Line Chart */}
              <Box sx={{ flex: 2 }}>
                <Typography
                  variant='h6'
                  sx={{
                    marginBottom: '16px',
                    color: themeColors.textPrimary,
                    fontFamily: 'RobotoCondensed-Bold'
                  }}
                >
                  6-Month Comparison: Arrival vs Spending
                </Typography>
                <Chart
                  options={{
                    chart: {
                      type: 'line',
                      height: 300
                    },
                    xaxis: {
                      categories: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec'
                      ]
                    },
                    colors: [themeColors.primary, themeColors.secondary],
                    tooltip: {
                      y: {
                        formatter: value => `$${value}`
                      }
                    },
                    stroke: {
                      curve: 'smooth',
                      width: 3
                    },
                    dataLabels: {
                      enabled: false
                    }
                  }}
                  series={[
                    {
                      name: 'Arrival',
                      data: [
                        500, 600, 800, 700, 900, 1000, 1000, 200, 300, 400, 150,
                        1200
                      ]
                    },
                    {
                      name: 'Spending',
                      data: [
                        400, 550, 700, 650, 800, 950, 200, 450, 250, 400, 500,
                        900
                      ]
                    }
                  ]}
                  type='line'
                  height={300}
                />
              </Box>

              {/* Pie Chart */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant='h6'
                  sx={{
                    marginBottom: '16px',
                    color: themeColors.textPrimary,
                    fontFamily: 'RobotoCondensed-Bold'
                  }}
                >
                  Efficiency
                </Typography>

                <PieChart
                  series={[
                    {
                      name: 'Groups',
                      data: pieChartData,
                      innerRadius: 40,
                      outerRadius: 100,
                      paddingAngle: 0,
                      cornerRadius: 12,
                      startAngle: -45,
                      endAngle: 360,
                      cx: 150,
                      cy: 150,
                      highlightScope: { fade: 'global', highlight: 'item' },
                      faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: 'gray'
                      }
                    }
                  ]}
                  {...pieParams}
                  width={300}
                  height={300}
                />
              </Box>
            </Box>
          </Box>
        </>
      )}

      {tabValue === 1 && (
        <Box sx={{ padding: '16px' }}>
          <Typography
            variant='h6'
            sx={{
              color: themeColors.textPrimary,
              fontFamily: 'RobotoCondensed-Bold'
            }}
          >
            Transactions
          </Typography>
          <Box sx={{ marginTop: '16px' }}>
            {transactions.map((transaction, index) => (
              <Card
                key={index}
                sx={{
                  marginBottom: '8px',
                  padding: '16px',
                  backgroundColor: themeColors.cardBackground,
                  color: themeColors.textPrimary,
                  fontFamily: 'RobotoCondensed-Regular'
                }}
              >
                <Typography variant='body1'>
                  {transaction.description} - ${transaction.amount}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    color: themeColors.textSecondary,
                    fontFamily: 'RobotoCondensed-Regular'
                  }}
                >
                  {new Date(transaction.date).toLocaleDateString()}
                </Typography>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </GlobalContainer>
  )
}

export default Dashboard

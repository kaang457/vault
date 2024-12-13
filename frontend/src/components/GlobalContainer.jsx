import React, { useState, useEffect } from 'react'
import colors from '../styles/colors'
import {
  Box,
  Typography,
  IconButton,
  SwipeableDrawer,
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  AccountBalanceWallet,
  BarChart,
  Person,
  Settings,
  SwapHoriz,
  Payments,
  Logout,
  Notifications,
  TrendingUp
} from '@mui/icons-material'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications'
import api from '../api'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import NotificationsButton from './NotificationsButton'

const Sidebar = ({
  darkMode,
  toggleDrawer,
  handleDarkModeToggle,
  drawerOpen
}) => {
  const themeColors = darkMode ? colors.dark : colors.light
  const navigate = useNavigate()

  return (
    <SwipeableDrawer
      anchor='left'
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
          backgroundColor: themeColors.drawerBackground,
          color: themeColors.textPrimary
        },
        '& .MuiDrawer-root .MuiSwipeableDrawer-root .privateSwipeArea': {
          backgroundColor: 'black',
          width: 0
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px'
        }}
      >
        <Box
          component='img'
          src={logo}
          alt='Logo'
          sx={{
            width: 150,
            height: 'auto',
            filter: darkMode ? 'invert(1)' : 'none'
          }}
          onClick={() => navigate('/')}
        />
      </Box>
      {[
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { text: 'Accounts', icon: <AccountBalanceWallet />, path: '/accounts' },
        { text: 'Transfers', icon: <SwapHoriz />, path: '/Transfers' },
        { text: 'Payments', icon: <Payments />, path: '/Payments' },
        { text: 'Analytics', icon: <BarChart />, path: '/Analytics' },
        { text: 'Settings', icon: <Settings />, path: '/Settings' },
        { text: 'Investments', icon: <TrendingUp />, path: '/investments' }
      ].map((item, index) => (
        <Box
          key={index}
          onClick={() => navigate(item.path)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            padding: '12px 16px',
            cursor: 'pointer',
            backgroundColor: themeColors.drawerBackground,
            borderRadius: '8px',
            marginBottom: '8px',
            '&:hover': { backgroundColor: themeColors.drawerHover }
          }}
        >
          {item.icon}
          <Typography>{item.text}</Typography>
        </Box>
      ))}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: 20
        }}
      >
        <IconButton onClick={handleDarkModeToggle}>
          {darkMode ? (
            <LightModeIcon sx={{ color: themeColors.textPrimary }} />
          ) : (
            <DarkModeIcon sx={{ color: themeColors.textPrimary }} />
          )}
        </IconButton>
      </Box>
    </SwipeableDrawer>
  )
}

const Navbar = ({ darkMode, toggleDrawer }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      await api.post('/logout/')
      localStorage.clear()
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      handleMenuClose()
    }
  }

  return (
    <AppBar
      position='static'
      color='transparent'
      elevation={0}
      sx={{
        backgroundColor: darkMode
          ? colors.dark.background
          : colors.light.background,
        color: darkMode ? colors.dark.textPrimary : colors.light.textPrimary
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon
            sx={{
              color: darkMode
                ? colors.dark.textPrimary
                : colors.light.textPrimary
            }}
          />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <NotificationsButton />
          <IconButton onClick={handleMenuOpen}>
            <Avatar />
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => navigate('/Profile')}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

const GlobalContainer = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem('darkMode')) || false
  )
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const handleDarkModeToggle = () => {
    setDarkMode(prevMode => !prevMode)
  }

  const toggleDrawer = open => () => {
    setDrawerOpen(open)
  }

  const themeColors = darkMode ? colors.dark : colors.light

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        paddingLeft: 0,
        backgroundColor: themeColors.background,
        color: themeColors.textPrimary,
        flexDirection: 'column'
      }}
    >
      <Navbar darkMode={darkMode} toggleDrawer={toggleDrawer} />
      <Sidebar
        darkMode={darkMode}
        toggleDrawer={toggleDrawer}
        handleDarkModeToggle={handleDarkModeToggle}
        drawerOpen={drawerOpen}
      />
      <Box sx={{ flex: 1 }}>{children}</Box>
      <Box
        sx={{
          width: '100%',
          padding: '12px 0',
          marginTop: 'auto',
          textAlign: 'center',
          backgroundColor: themeColors.footerBackground
        }}
      >
        <Typography variant='body2' sx={{ color: themeColors.textSecondary }}>
          © 2024 Vault. All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}

export default GlobalContainer

import React from 'react'
import { Box, CircularProgress } from '@mui/material'

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
      }}
    >
      <Box
        sx={{
          padding: '16px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress /> {/* Replace recursive call with a spinner */}
      </Box>
    </Box>
  )
}

export default LoadingScreen

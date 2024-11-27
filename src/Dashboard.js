import React from 'react';
import { Box, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0f7fa',
      }}
    >
      <Typography variant="h4">Welcome to the Dashboard!</Typography>
    </Box>
  );
};

export default Dashboard;

import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  IconButton,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  AccountBalanceWallet,
  BarChart,
  Person,
  Settings,
  SwapHoriz,
  Notifications,
} from "@mui/icons-material";
import DarkModeIcon from "@mui/icons-material/DarkMode"; 
import logo from "./assets/logo.png"; 
import Payments from '@mui/icons-material/Payments';
import Logout from '@mui/icons-material/Logout';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: darkMode ? "#121212" : "#f5f5f5",
        color: darkMode ? "#f5f5f5" : "#000",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: 240,
          flexShrink: 0,
          backgroundColor: darkMode ? "#333" : "#B8B8F7",
          color: darkMode ? "#f5f5f5" : "#ffffff",
          display: "flex",
          flexDirection: "column",
          padding: "16px",
        }}
      >
        {/* Logo */}
        <Box
      
          sx={{
            
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "50px",
            cursor: "pointer",
          }}
          onClick={() => {
            window.location.href = "/"; 
          }}
        >
              {/* Logo */}
      <Box
        component="img"
        src={logo}
        alt="Logo"
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          width: 150,
          height: 'auto',
          filter: darkMode ? 'invert(1)' : 'none',
        }}
      />

        </Box>

        {/* Menu Items */}
        <List>
          {[
            { text: "Dashboard", icon: <DashboardIcon /> },
            { text: "Accounts", icon: <AccountBalanceWallet /> },
            { text: "Transfers", icon: <SwapHoriz /> },
            { text: "Payments", icon: <Payments /> },
            { text: "Analytics", icon: <BarChart /> },
            { text: "Notifications", icon: <Notifications /> },
            { text: "Profile", icon: <Person /> },
            { text: "Settings", icon: <Settings /> },
            { text: "Logout", icon: <Logout /> },
            
          ].map((item, index) => (
            <ListItem
              button
              key={item.text}
              sx={{
                backgroundColor: darkMode ? "#444" : "#B8B8F7",
                color: darkMode ? "#f5f5f5" : "#ffffff",
                borderRadius: "8px",
                marginBottom: "8px",
                "&:hover": {
                  backgroundColor: darkMode ? "#555" : "#a3a3d3",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: darkMode ? "#f5f5f5" : "#ffffff",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

        {/* Dark Mode Toggle */}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: 20,
          }}
        >
          <IconButton onClick={handleDarkModeToggle}>
            <DarkModeIcon
              sx={{
                color: darkMode ? "#f5f5f5" : "#000",
              }}
            />
          </IconButton>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          backgroundColor: darkMode ? "#121212" : "#ffffff",
          color: darkMode ? "#f5f5f5" : "#000",
        }}
      >
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
            <Avatar />
          </Toolbar>
        </AppBar>

        {/* Content Area */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            marginTop: 4,
          }}
        >
          {/* Cards */}
          {[
            { title: "Balance", value: "XXXXXX" },
            { title: "Income", value: "XXXXX" },
            { title: "Savings", value: "XXXXX" },
          ].map((card, index) => (
            <Paper
              key={index}
              sx={{
                flex: "1 1 calc(33.333% - 16px)",
                padding: 2,
                minWidth: 240,
                maxWidth: 300,
                backgroundColor: darkMode ? "#333" : "#fff",
                color: darkMode ? "#f5f5f5" : "#000",
              }}
            >
              <Typography variant="h6">{card.title}</Typography>
              <Typography variant="h4">{card.value}</Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

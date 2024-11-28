import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Paper,
  IconButton,
  SwipeableDrawer,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  AccountBalanceWallet,
  BarChart,
  Person,
  Settings,
  SwapHoriz,
  Notifications,
  Payments,
  Logout,
} from "@mui/icons-material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import logo from "./assets/logo.png";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate(); 


  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
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
      {/* Swipeable Drawer */}
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            backgroundColor: darkMode ? "#333" : "#B8B8F7",
            color: darkMode ? "#f5f5f5" : "#ffffff",
            position: "relative", 
          },
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px",
            marginBottom: "16px",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: 150,
              height: "auto",
              filter: darkMode ? "invert(1)" : "none",
            }}
            onClick={() => (window.location.href = "/")}
          />
        </Box>

        {/* Menu Items */}
        {[
          { text: "Dashboard", icon: <DashboardIcon />, top: "100px", left: "20px" ,path :"/Dashboard"},
          { text: "Accounts", icon: <AccountBalanceWallet />, top: "160px", left: "20px",path :"/Accounts"},
          { text: "Transfers", icon: <SwapHoriz />, top: "220px", left: "20px",path :"/Transfers"},
          { text: "Payments", icon: <Payments />, top: "280px", left: "20px",path :"/Payments"},
          { text: "Analytics", icon: <BarChart />, top: "340px", left: "20px",path :"/Analytics"},
          { text: "Notifications", icon: <Notifications />, top: "400px", left: "20px",path :"/Notifications"},
          { text: "Profile", icon: <Person />, top: "460px", left: "20px",path :"/Profile"},
          { text: "Settings", icon: <Settings />, top: "640px", left: "20px",path :"/Settings"},
          { text: "Logout", icon: <Logout/>, top: "700px", left: "20px",path :"/" },
        ].map((item, index) => (
          <Box
            key={index}
            onClick={() => navigate(item.path)}
            sx={{
              position: "absolute",
              top: item.top,
              left: item.left,
              display: "flex",
              alignItems: "center",
              gap: 2,
              padding: "12px 16px",
              backgroundColor: darkMode ? "#444" : "#B8B8F7",
              color: darkMode ? "#f5f5f5" : "#ffffff",
              borderRadius: "8px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: darkMode ? "#555" : "#a3a3d3",
              },
            }}
           
          >
            {item.icon}
            <Typography>{item.text}</Typography>
          </Box>
        ))}

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
      </SwipeableDrawer>

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
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          sx={{
            backgroundColor: darkMode ? "#121212" : "#ffffff",
            color: darkMode ? "#f5f5f5" : "#000",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon
                sx={{
                  color: darkMode ? "#f5f5f5" : "#000",
                }}
              />
            </IconButton>
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
          {[{ title: "Balance", value: "XXXXXX" }, { title: "Income", value: "XXXXX" }, { title: "Savings", value: "XXXXX" }].map(
            (card, index) => (
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
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

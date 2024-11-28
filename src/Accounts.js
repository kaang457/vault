import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  SwipeableDrawer,
  AppBar,
  Toolbar,
  Avatar,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  AccountBalanceWallet,
  BarChart,
  Person,
  Settings,
  SwapHoriz,
  Notifications,
  Payments,
  Logout,
  Menu as MenuIcon,
} from "@mui/icons-material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import logo from "./assets/logo.png";
import { useNavigate } from "react-router-dom";

const Accounts = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const accounts = [
    { accountNumber: "XXXXX", accountType: "XXXXX", balance: "$XXXXX" },
    { accountNumber: "XXXXX", accountType: "XXXXX", balance: "$XXXXX" },
    { accountNumber: "XXXXX", accountType: "XXXXX", balance: "$XXXXX" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden", // Sayfa taşmasını önler
        backgroundColor: darkMode ? "#121212" : "#f5f5f5",
        color: darkMode ? "#f5f5f5" : "#000",
      }}
    >
      {/* Sidebar - Swipeable Drawer */}
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
            {darkMode ? (
              <LightModeIcon sx={{ color: "#f5f5f5" }} />
            ) : (
              <DarkModeIcon sx={{ color: "#000" }} />
            )}
          </IconButton>
        </Box>
      </SwipeableDrawer>

            <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: darkMode ? "#121212" : "#ffffff",
        }}
      >
        {/* App Bar */}
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
            <Typography variant="h6">Accounts</Typography>
            <Avatar />
          </Toolbar>
        </AppBar>

        {/* Content Area */}
        <Box
          sx={{
            flexGrow: 1, 
            padding: "16px",
          }}
        >
          <Typography></Typography>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            width: "100%",
            padding: "35px 0",
            textAlign: "center",
            backgroundColor: darkMode ? "#333" : "#B8B8F7",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: darkMode ? "#f5f5f5" : "#ffffff",
            }}
          >
            © 2024 Vault. All rights reserved.
          </Typography>
        </Box>
      </Box>
      </Box>
  );
};

export default Accounts;

import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  SwipeableDrawer,
  AppBar,
  Toolbar,
  Avatar,
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
import LightModeIcon from "@mui/icons-material/LightMode";
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
        minHeight: "100vh",
        backgroundColor: darkMode ? "#121212" : "#f5f5f5",
        color: darkMode ? "#f5f5f5" : "#000",
        flexDirection: "column",
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
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
          <Avatar />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          padding: "16px",
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
              onClick={() => navigate("/")}
            />
          </Box>

          {/* Menu Items */}
          {[
            { text: "Dashboard", icon: <DashboardIcon />, path: "/Dashboard" },
            { text: "Accounts", icon: <AccountBalanceWallet />, path: "/Accounts" },
            { text: "Transfers", icon: <SwapHoriz />, path: "/Transfers" },
            { text: "Payments", icon: <Payments />, path: "/Payments" },
            { text: "Analytics", icon: <BarChart />, path: "/Analytics" },
            { text: "Notifications", icon: <Notifications />, path: "/Notifications" },
            { text: "Profile", icon: <Person />, path: "/Profile" },
            { text: "Settings", icon: <Settings />, path: "/Settings" },
            { text: "Logout", icon: <Logout />, path: "/" },
          ].map((item, index) => (
            <Box
              key={index}
              onClick={() => navigate(item.path)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                padding: "12px 16px",
                backgroundColor: darkMode ? "#444" : "#B8B8F7",
                color: darkMode ? "#f5f5f5" : "#ffffff",
                borderRadius: "8px",
                cursor: "pointer",
                marginBottom: "8px",
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
  );
};

export default Dashboard;

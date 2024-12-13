import React, { useState } from "react";
import colors from "../styles/colors";
import {
  Box,
  Typography,
  IconButton,
  SwipeableDrawer,
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
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
  TrendingUp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../api";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import logo from "../assets/logo.png";

const Sidebar = ({
  darkMode,
  toggleDrawer,
  handleDarkModeToggle,
  drawerOpen,
}) => {
  const themeColors = darkMode ? colors.dark : colors.light;
  const navigate = useNavigate();

  return (
    <SwipeableDrawer
      anchor="left"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          backgroundColor: themeColors.drawerBackground,
          color: themeColors.textPrimary,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px",
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
      {[
        { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
        { text: "Accounts", icon: <AccountBalanceWallet />, path: "/accounts" },
        { text: "Transfers", icon: <SwapHoriz />, path: "/transfers" },
        { text: "Payments", icon: <Payments />, path: "/payments" },
        { text: "Analytics", icon: <BarChart />, path: "/analytics" },
        { text: "Investments", icon: <TrendingUp />, path: "/investments" },
        {
          text: "Notifications",
          icon: <Notifications />,
          path: "/notifications",
        },
        { text: "Profile", icon: <Person />, path: "/profile" },
        { text: "Settings", icon: <Settings />, path: "/settings" },
      ].map((item, index) => (
        <Box
          key={index}
          onClick={() => navigate(item.path)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: "12px 16px",
            cursor: "pointer",
            backgroundColor: themeColors.drawerBackground,
            borderRadius: "8px",
            marginBottom: "8px",
            "&:hover": { backgroundColor: themeColors.drawerHover },
          }}
        >
          {item.icon}
          <Typography>{item.text}</Typography>
        </Box>
      ))}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: 20,
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
  );
};

const Navbar = ({ darkMode, toggleDrawer }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout/");
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      handleMenuClose();
    }
  };

  return (
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
          <MenuIcon sx={{ color: darkMode ? "#f5f5f5" : "#000" }} />
        </IconButton>
        <Typography variant="h6" noWrap></Typography>
        <Box>
          <IconButton onClick={handleMenuOpen}>
            <Avatar />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const GlobalContainer = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const themeColors = darkMode ? colors.dark : colors.light;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: themeColors.background,
        color: themeColors.textPrimary,
        flexDirection: "column",
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
          width: "100%",
          padding: "12px 0",
          marginTop: "auto",
          textAlign: "center",
          backgroundColor: themeColors.footerBackground,
        }}
      >
        <Typography variant="body2" sx={{ color: themeColors.textSecondary }}>
          © 2024 Vault. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default GlobalContainer;

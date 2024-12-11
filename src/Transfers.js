import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
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

const Transfers = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null); // Seçili işlem
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
        overflow: "hidden",
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
          // Drawer Menu Items
          { text: "Dashboard", icon: <DashboardIcon />, path: "/Dashboard" },
          {
            text: "Accounts",
            icon: <AccountBalanceWallet />,
            path: "/Accounts",
          },
          { text: "Transfers", icon: <SwapHoriz />, path: "/Transfers" },
          { text: "Payments", icon: <Payments />, path: "/Payments" },
          { text: "Analytics", icon: <BarChart />, path: "/Analytics" },
          {
            text: "Notifications",
            icon: <Notifications />,
            path: "/Notifications",
          },
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
              cursor: "pointer",
              backgroundColor: darkMode ? "#444" : "#B8B8F7",
              borderRadius: "8px",
              marginBottom: "8px",
              "&:hover": { backgroundColor: darkMode ? "#555" : "#a3a3d3" },
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

      {/* Main Content */}
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
            <Typography variant="h6">Transfers</Typography>
            <Avatar />
          </Toolbar>
        </AppBar>

        {/* Content Area */}
        {/* Spending Limits Section */}
        <Box
          sx={{
            backgroundColor: darkMode ? "#333" : "#ffffff",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            marginBottom: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: darkMode ? "#f5f5f5" : "#000",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Spending Limits Transaction
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: darkMode ? "#f5f5f5" : "#000",
                fontWeight: "bold",
              }}
            >
              $50,834.22
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: darkMode ? "#aaa" : "#666",
                marginBottom: "8px",
              }}
            >
              Has reached $40,834.22
            </Typography>
            {/* Progress Bar */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Box
                sx={{
                  height: "8px",
                  flex: 1,
                  backgroundColor: "#93C5FD",
                  borderRadius: "4px",
                }}
              />
              <Box
                sx={{
                  height: "8px",
                  flex: 1,
                  backgroundColor: "#FDE68A",
                  borderRadius: "4px",
                }}
              />
              <Box
                sx={{
                  height: "8px",
                  flex: 1,
                  backgroundColor: "#E5E7EB",
                  borderRadius: "4px",
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: darkMode ? "#aaa" : "#666",
                marginTop: "8px",
              }}
            >
              Available credit limit $60,285.00
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: "right",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: darkMode ? "#aaa" : "#666",
                marginBottom: "8px",
              }}
            >
              Today Transaction Limit Mar, 2024
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#22C55E",
                fontWeight: "bold",
              }}
            >
              +75.06%
            </Typography>
          </Box>
        </Box>

        {/* Transactions Section */}
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            overflow: "hidden",
          }}
        >
          {/* Transactions List */}
          <Box
            sx={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              backgroundColor: darkMode ? "#333" : "#ffffff",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
              marginRight: "16px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: darkMode ? "#f5f5f5" : "#000",
                marginBottom: "16px",
              }}
            >
              Transactions
            </Typography>
            {[
              // Statik transaction verileri
              {
                name: "Amazon Support",
                category: "Supplies",
                amount: "-$2,340.50",
                time: "5:45 PM",
                date: "11 Dec, 2024",
                type: "expense",
                description: "Monthly subscription payment for AWS services.",
              },
              {
                name: "Roland GmbH",
                category: "Marketing",
                amount: "+$50,400.00",
                time: "3:30 PM",
                date: "10 Dec, 2024",
                type: "income",
                description: "Revenue from marketing campaign.",
              },
              {
                name: "Bank of America",
                category: "Office Supplies",
                amount: "-$10,100.00",
                time: "4:10 PM",
                date: "10 Dec, 2024",
                type: "expense",
                description: "Purchase of new office equipment.",
              },
              {
                name: "Cash Withdrawal",
                category: "General Banking",
                amount: "-$20,905.00",
                time: "5:45 PM",
                date: "10 Dec, 2024",
                type: "expense",
                description: "Withdrawal for company expenses.",
              },
            ].map((transaction, index) => (
              <Box
                key={index}
                onClick={() => setSelectedTransaction(transaction)} // Seçim için
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  backgroundColor: darkMode ? "#444" : "#f9f9f9",
                  marginBottom: "8px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: darkMode ? "#555" : "#e0e0e0",
                  },
                }}
              >
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: darkMode ? "#f5f5f5" : "#000",
                      fontWeight: "bold",
                    }}
                  >
                    {transaction.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: darkMode ? "#aaa" : "#666" }}
                  >
                    {transaction.date} • {transaction.category} •{" "}
                    {transaction.time}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color:
                      transaction.type === "income" ? "#22C55E" : "#EF4444",
                    fontWeight: "bold",
                  }}
                >
                  {transaction.amount}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Transaction Details Panel */}
          <Box
            sx={{
              flex: 1,
              padding: "16px",
              backgroundColor: darkMode ? "#333" : "#ffffff",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: darkMode ? "#f5f5f5" : "#000",
                marginBottom: "16px",
              }}
            >
              Transaction Details
            </Typography>
            {selectedTransaction ? (
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: darkMode ? "#f5f5f5" : "#000",
                    fontWeight: "bold",
                  }}
                >
                  {selectedTransaction.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: darkMode ? "#aaa" : "#666",
                    marginBottom: "8px",
                  }}
                >
                  {selectedTransaction.category}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: darkMode ? "#f5f5f5" : "#000",
                    marginBottom: "8px",
                  }}
                >
                  Amount: {selectedTransaction.amount}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: darkMode ? "#f5f5f5" : "#000",
                    marginBottom: "8px",
                  }}
                >
                  Time: {selectedTransaction.time}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: darkMode ? "#aaa" : "#666",
                  }}
                >
                  Date: {selectedTransaction.date} {/* Tarihi gösteren alan */}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: darkMode ? "#aaa" : "#666",
                  }}
                >
                  {selectedTransaction.description}
                </Typography>
              </Box>
            ) : (
              <Typography
                variant="body2"
                sx={{ color: darkMode ? "#aaa" : "#666" }}
              >
                Select a transaction to see details
              </Typography>
            )}
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            width: "100%",
            padding: "12px 0",
            marginTop: "auto",
            textAlign: "center",
            backgroundColor: darkMode ? "#333" : "#B8B8F7",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: darkMode ? "#f5f5f5" : "#ffffff" }}
          >
            © 2024 Vault. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Transfers;

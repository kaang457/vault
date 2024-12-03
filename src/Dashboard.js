import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  SwipeableDrawer,
  AppBar,
  Toolbar,
  Avatar,
  Card,
  CardContent,
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
import Chart from "react-apexcharts";

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
            <MenuIcon sx={{ color: darkMode ? "#f5f5f5" : "#000" }} />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
          <Avatar />
        </Toolbar>
      </AppBar>

      {/* Balance, Income, Savings Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {[
          // Card data
          {
            title: "Balance",
            value: "$27,632",
            change: "+2.5%",
            changeColor: "green",
            description: "Compared to $21,430 last year",
          },
          {
            title: "Income",
            value: "$20,199",
            change: "+0.5%",
            changeColor: "green",
            description: "Compared to $19,000 last year",
          },
          {
            title: "Savings",
            value: "$110",
            change: "-1.5%",
            changeColor: "red",
            description: "Compared to $165 last year",
          },
        ].map((item, index) => (
          <Card
            key={index}
            sx={{
              flex: "1 1 calc(16% - 6px)",
              padding: "8px",
              height: "100px",
              backgroundColor: darkMode ? "#333" : "#ffffff",
              color: darkMode ? "#f5f5f5" : "#000",
              textAlign: "center",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: "8px" }}>
                {item.title}
              </Typography>
              <Typography
                variant="h4"
                sx={{ marginBottom: "8px", fontWeight: "bold" }}
              >
                {item.value}
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginBottom: "8px", color: item.changeColor }}
              >
                {item.change}
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Chart Section */}
      <Box
        sx={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: 4, // Adds spacing between charts and savings section
          backgroundColor: darkMode ? "#333" : "#ffffff",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        {/* Charts Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 4, // Space between line and pie charts
            marginBottom: "16px", // Adds space below charts
          }}
        >
          {/* Line Chart */}
          <Box sx={{ flex: 2 }}>
            <Typography
              variant="h6"
              sx={{
                marginBottom: "16px",
                color: darkMode ? "#f5f5f5" : "#000",
              }}
            >
              6-Month Comparison: Arrival vs Spending
            </Typography>
            <Chart
              options={{
                chart: {
                  type: "line",
                  height: 300,
                },
                xaxis: {
                  categories: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
                },
                colors: ["#3B82F6", "#F59E0B"],
                tooltip: {
                  y: {
                    formatter: (value) => `$${value}`,
                  },
                },
                stroke: {
                  curve: "smooth",
                  width: 3,
                },
                dataLabels: {
                  enabled: false,
                },
              }}
              series={[
                { name: "Arrival", data: [500, 600, 800, 700, 900, 1000] },
                { name: "Spending", data: [400, 550, 700, 650, 800, 950] },
              ]}
              type="line"
              height={300}
            />
          </Box>

          {/* Pie Chart */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: "16px",
                color: darkMode ? "#f5f5f5" : "#000",
              }}
            >
              Efficiency
            </Typography>
            <Chart
              options={{
                labels: ["Arrival", "Spending", "Savings"],
                colors: ["#3B82F6", "#00008B", "#93C5FD"],
                legend: {
                  position: "bottom",
                },
              }}
              series={[15, 28, 13]}
              type="donut"
              height={250}
            />
          </Box>
        </Box>

        {/* Savings and Transactions Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 4, // Adds spacing between Savings and Transactions sections
            marginTop: "16px",
          }}
        >
          {/* Savings Section */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: darkMode ? "#333" : "#ffffff",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: "16px",
                color: darkMode ? "#f5f5f5" : "#000",
              }}
            >
              Your Savings
            </Typography>
            {[
              {
                icon: "💰",
                amount: "$10,000",
                goal: "$20,000",
                percentage: "3%",
                progress: 50,
                color: "#60A5FA", // Light blue
              },
              {
                icon: "🐖",
                amount: "$8,000",
                goal: "$12,000",
                percentage: "77%",
                progress: 75,
                color: "#3B82F6", // Dark blue
              },
            ].map((saving, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: darkMode ? "#444" : "#f9f9f9",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <Box
                  sx={{
                    fontSize: "32px",
                    marginRight: "16px",
                    color: saving.color,
                  }}
                >
                  {saving.icon}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {saving.amount}/{saving.goal}
                  </Typography>
                  <Box
                    sx={{
                      height: "8px",
                      backgroundColor: "#e0e0e0",
                      borderRadius: "4px",
                      marginTop: "8px",
                      marginBottom: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        width: `${saving.progress}%`,
                        height: "100%",
                        backgroundColor: saving.color,
                      }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: darkMode ? "#f5f5f5" : "#666",
                    }}
                  >
                    {saving.percentage} of your goal
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Transactions Table */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: darkMode ? "#333" : "#ffffff",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: "16px",
                color: darkMode ? "#f5f5f5" : "#000",
              }}
            >
              Transactions
            </Typography>
            <Box>
              {[
                {
                  company: "Google",
                  client: "Jeremy Rice",
                  amount: "$744",
                  rank: { value: 4.2, status: "Good", color: "#3B82F6" },
                },
                {
                  company: "Facebook",
                  client: "Antonio Greene",
                  amount: "$900",
                  rank: { value: 4.6, status: "Good", color: "#3B82F6" },
                },
                {
                  company: "YouTube",
                  client: "Clarence Diaz",
                  amount: "$560",
                  rank: { value: 2.8, status: "Bad", color: "#EF4444" },
                },
              ].map((transaction, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px",
                    backgroundColor: darkMode ? "#444" : "#f9f9f9",
                    borderRadius: "8px",
                    marginBottom: "12px",
                  }}
                >
                  {/* Company Icon */}
                  <Box
                    sx={{
                      fontSize: "24px",
                      marginRight: "16px",
                    }}
                  >
                    {transaction.company === "Google" && "🌐"}
                    {transaction.company === "Facebook" && "📘"}
                    {transaction.company === "YouTube" && "📺"}
                  </Box>

                  {/* Client and Details */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {transaction.company}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: darkMode ? "#f5f5f5" : "#666" }}
                    >
                      {transaction.client}
                    </Typography>
                  </Box>

                  {/* Amount */}
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", color: "#3B82F6" }}
                    >
                      {transaction.amount}
                    </Typography>
                  </Box>

                  {/* Rank */}
                  <Box sx={{ marginLeft: "16px", textAlign: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: transaction.rank.color,
                      }}
                    >
                      {transaction.rank.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: darkMode ? "#f5f5f5" : "#666",
                      }}
                    >
                      {transaction.rank.status}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

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

export default Dashboard;

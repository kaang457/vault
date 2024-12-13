import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import mockStocks from "../mockData"; // Import mock data
import GlobalContainer from "../components/GlobalContainer"; // Import GlobalContainer for menu

const Investments = () => {
  const [portfolio, setPortfolio] = useState([]); // User's portfolio
  const [stocks, setStocks] = useState([]); // Mock stock data
  const [selectedStock, setSelectedStock] = useState(""); // Selected stock
  const [quantity, setQuantity] = useState(""); // Quantity to buy/sell
  const [error, setError] = useState(""); // Error messages

  // Fetch mock stock data
  useEffect(() => {
    setStocks(mockStocks); // Use mock data
  }, []);

  // Handle stock purchase
  const handleBuy = () => {
    if (!selectedStock || !quantity || parseInt(quantity) <= 0) {
      setError("Please select a stock and enter a valid quantity.");
      return;
    }

    const stock = stocks.find((s) => s.symbol === selectedStock);

    // Update portfolio
    setPortfolio((prev) => {
      const existingStock = prev.find((s) => s.symbol === selectedStock);
      if (existingStock) {
        return prev.map((s) =>
          s.symbol === selectedStock
            ? { ...s, quantity: s.quantity + parseInt(quantity) }
            : s
        );
      } else {
        return [...prev, { ...stock, quantity: parseInt(quantity) }];
      }
    });

    setError("");
    alert(`Successfully bought ${quantity} shares of ${selectedStock}`);
  };

  // Handle stock sale
  const handleSell = () => {
    if (!selectedStock || !quantity || parseInt(quantity) <= 0) {
      setError("Please select a stock and enter a valid quantity.");
      return;
    }

    setPortfolio((prev) => {
      const existingStock = prev.find((s) => s.symbol === selectedStock);

      if (!existingStock || existingStock.quantity < parseInt(quantity)) {
        setError("You don't have enough shares to sell.");
        return prev;
      }

      return existingStock.quantity === parseInt(quantity)
        ? prev.filter((s) => s.symbol !== selectedStock)
        : prev.map((s) =>
            s.symbol === selectedStock
              ? { ...s, quantity: s.quantity - parseInt(quantity) }
              : s
          );
    });

    setError("");
    alert(`Successfully sold ${quantity} shares of ${selectedStock}`);
  };

  return (
    <GlobalContainer>
      <Box
        sx={{
          padding: "32px",
          backgroundColor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          sx={{ marginBottom: "24px", fontWeight: "bold" }}
        >
          Investments
        </Typography>

        {/* Real-Time Stock Data */}
        <Typography variant="h6" sx={{ marginBottom: "16px" }}>
          Real-Time Stock Data
        </Typography>
        <TableContainer component={Paper} sx={{ marginBottom: "32px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks.map((stock, index) => (
                <TableRow key={index}>
                  <TableCell>{stock.symbol}</TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell>${stock.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Buy/Sell Form */}
        <Box sx={{ marginBottom: "32px" }}>
          <Typography variant="h6" sx={{ marginBottom: "16px" }}>
            Buy/Sell Stocks
          </Typography>
          <TextField
            fullWidth
            select
            label="Select Stock"
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            sx={{ marginBottom: "16px" }}
            SelectProps={{ native: true }}
          >
            <option value="">-- Select a Stock --</option>
            {stocks.map((stock) => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.symbol}
              </option>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            sx={{ marginBottom: "16px" }}
          />
          {error && (
            <Typography color="error" sx={{ marginBottom: "16px" }}>
              {error}
            </Typography>
          )}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleBuy}>
              Buy
            </Button>
            <Button variant="contained" color="secondary" onClick={handleSell}>
              Sell
            </Button>
          </Box>
        </Box>

        {/* User Portfolio */}
        <Typography variant="h6" sx={{ marginBottom: "16px" }}>
          Your Portfolio
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolio.map((stock, index) => (
                <TableRow key={index}>
                  <TableCell>{stock.symbol}</TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell>{stock.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </GlobalContainer>
  );
};

export default Investments;

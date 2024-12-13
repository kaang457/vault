import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import GlobalContainer from "../components/GlobalContainer";

const TransfersPage = () => {
  const theme = useTheme(); // Tema bilgisi
  const [balance, setBalance] = useState(1000);
  const [iban, setIban] = useState("");
  const [amount, setAmount] = useState("");
  const [transferHistory, setTransferHistory] = useState([]);

  const handleSendMoney = () => {
    const transferAmount = parseFloat(amount);

    if (transferAmount <= 0) {
      alert("The amount to be sent must be greater than zero.");
      return;
    }

    if (transferAmount > balance) {
      alert("Insufficient balance.");
      return;
    }

    setBalance((prevBalance) => prevBalance - transferAmount);

    const newTransfer = {
      type: "Outgoing",
      iban,
      amount: transferAmount,
      date: new Date(),
    };

    setTransferHistory((prevHistory) => [newTransfer, ...prevHistory]);
    setIban("");
    setAmount("");
    alert(`Successfully sent ${transferAmount} $ to IBAN: ${iban}`);
  };

  const getRecentTransfers = () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return transferHistory.filter(
      (transfer) => new Date(transfer.date) > oneMonthAgo
    );
  };

  return (
    <GlobalContainer>
      <Typography
        variant="h4"
        sx={{
          color: theme.palette.text.primary,
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        Transfer Operations
      </Typography>

      {/* Current Balance */}
      <Card
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? "#2E2E2E" : "#FFFFFF",
          color: theme.palette.text.primary,
          marginBottom: "16px",
          padding: "16px",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0px 4px 8px rgba(255,255,255,0.1)"
              : "0px 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent>
          <Typography variant="subtitle1">Current Balance:</Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {balance.toFixed(2)} $
          </Typography>
        </CardContent>
      </Card>

      {/* Send Money Form */}
      <Box
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? "#2E2E2E" : "#FFFFFF",
          padding: "24px",
          borderRadius: "8px",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0px 4px 8px rgba(255,255,255,0.1)"
              : "0px 4px 8px rgba(0,0,0,0.1)",
          marginBottom: "24px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ marginBottom: "16px", color: theme.palette.text.primary }}
        >
          Send Money
        </Typography>
        <TextField
          label="IBAN"
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: "16px",
            input: { color: theme.palette.text.primary },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.divider,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
          value={iban}
          onChange={(e) => setIban(e.target.value)}
        />
        <TextField
          label="Amount ($)"
          variant="outlined"
          fullWidth
          type="number"
          sx={{
            marginBottom: "16px",
            input: { color: theme.palette.text.primary },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.divider,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
          fullWidth
          onClick={handleSendMoney}
        >
          Send
        </Button>
      </Box>

      {/* Transfer History */}
      <Box
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? "#2E2E2E" : "#FFFFFF",
          padding: "24px",
          borderRadius: "8px",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0px 4px 8px rgba(255,255,255,0.1)"
              : "0px 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ marginBottom: "16px", color: theme.palette.text.primary }}
        >
          Last 1 Month Transfer History
        </Typography>
        <List>
          {getRecentTransfers().length === 0 ? (
            <Typography sx={{ color: theme.palette.text.secondary }}>
              No transfers in the last month.
            </Typography>
          ) : (
            getRecentTransfers().map((transfer, index) => (
              <ListItem
                key={index}
                sx={{
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  marginBottom: "8px",
                }}
              >
                <ListItemText
                  primary={`IBAN: ${transfer.iban} - Amount: ${transfer.amount} $`}
                  secondary={`${new Date(
                    transfer.date
                  ).toLocaleDateString()} ${new Date(
                    transfer.date
                  ).toLocaleTimeString()}`}
                  sx={{ color: theme.palette.text.primary }}
                />
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </GlobalContainer>
  );
};

export default TransfersPage;

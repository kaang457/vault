import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import GlobalContainer from "../components/GlobalContainer"; // Sidebar ile uyumlu container
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // API'den bildirimleri çekme
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      // API'den veri çek (örnek endpoint)
      const response = await fetch("/api/notifications");
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications(); // Sayfa yüklendiğinde bildirimleri çek
  }, []);

  // Bildirimi "Okundu" olarak işaretleme
  const markAsRead = (index) => {
    setNotifications((prev) =>
      prev.map((notif, i) => (i === index ? { ...notif, read: true } : notif))
    );
  };

  // Bildirimi silme
  const removeNotification = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <GlobalContainer>
      <Typography
        variant="h4"
        sx={{
          color: "text.primary",
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        Notifications
      </Typography>

      {loading ? (
        <Typography variant="body1">Loading notifications...</Typography>
      ) : notifications.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No notifications available.
        </Typography>
      ) : (
        <List>
          {notifications.map((notification, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  backgroundColor: notification.read
                    ? "background.default"
                    : "#f5f5f5",
                  padding: "16px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <ListItemText
                  primary={notification.title}
                  secondary={`${notification.message} - ${new Date(
                    notification.date
                  ).toLocaleString()}`}
                  sx={{
                    textDecoration: notification.read ? "line-through" : "none",
                  }}
                />
                {/* Okundu olarak işaretleme düğmesi */}
                <IconButton
                  onClick={() => markAsRead(index)}
                  disabled={notification.read}
                  sx={{
                    color: notification.read ? "gray" : "green",
                  }}
                >
                  <CheckCircleIcon />
                </IconButton>
                {/* Bildirimi silme düğmesi */}
                <IconButton
                  onClick={() => removeNotification(index)}
                  sx={{ color: "red" }}
                >
                  <HighlightOffIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </GlobalContainer>
  );
};

export default Notifications;

import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Popover
} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

const NotificationsDropdown = ({ anchorEl, onClose }) => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  const open = Boolean(anchorEl)

  // API'den bildirimleri çekme
  const fetchNotifications = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/notifications') // API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch notifications')
      }
      const data = await response.json()
      setNotifications(data)
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      fetchNotifications()
    }
  }, [open])

  // Bildirimi "Okundu" olarak işaretleme
  const markAsRead = index => {
    setNotifications(prev =>
      prev.map((notif, i) => (i === index ? { ...notif, read: true } : notif))
    )
  }

  // Bildirimi silme
  const removeNotification = index => {
    setNotifications(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
    >
      <Box sx={{ width: 300, p: 2 }}>
        <Typography
          variant='h6'
          sx={{
            color: 'text.primary',
            fontWeight: 'bold',
            marginBottom: '8px'
          }}
        >
          Notifications
        </Typography>

        {loading ? (
          <Typography variant='body1'>Loading notifications...</Typography>
        ) : notifications.length === 0 ? (
          <Typography variant='body1' color='text.secondary'>
            No notifications available.
          </Typography>
        ) : (
          <List>
            {notifications.map((notification, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    backgroundColor: notification.read
                      ? 'background.default'
                      : '#f5f5f5',
                    padding: '16px',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <ListItemText
                    primary={notification.title}
                    secondary={`${notification.message} - ${new Date(
                      notification.date
                    ).toLocaleString()}`}
                    sx={{
                      textDecoration: notification.read
                        ? 'line-through'
                        : 'none'
                    }}
                  />
                  {/* Okundu olarak işaretleme düğmesi */}
                  <IconButton
                    onClick={() => markAsRead(index)}
                    disabled={notification.read}
                    sx={{
                      color: notification.read ? 'gray' : 'green'
                    }}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                  {/* Bildirimi silme düğmesi */}
                  <IconButton
                    onClick={() => removeNotification(index)}
                    sx={{ color: 'red' }}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Popover>
  )
}

const NotificationsButton = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <NotificationsIcon />
      </IconButton>
      <NotificationsDropdown anchorEl={anchorEl} onClose={handleClose} />
    </Box>
  )
}

export { NotificationsDropdown, NotificationsButton }

export default NotificationsButton

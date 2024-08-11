import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import './PrimarySearchAppBar.css'; // Ensure the path is correct

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const tealMode = false; // Ensure light theme

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const theme = createTheme({
    palette: {
      mode: tealMode ? 'dark' : 'light',
      primary: {
        main: '#0747a1', // White for primary color
      },
      secondary: {
        main: '#f5f5f5', // Very light gray for secondary color
      },
      background: {
        default: '#ffffff', // White background
        paper: '#f5f5f5', // Light gray for paper elements
      },
      text: {
        primary: '#000000', // Black for primary text
        secondary: '#333333', // Dark gray for secondary text
        disabled: '#bdbdbd', // Gray for disabled text
      },
      divider: '#e0e0e0', // Light gray for dividers
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 14,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {/* You can add any text here if needed */}
          </Typography>
          <Typography variant="h6" noWrap component="div" sx={{ marginRight: 2 }}>
            Anshika
          </Typography>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id="primary-search-account-menu"
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
      </AppBar>
    </ThemeProvider>
  );
}

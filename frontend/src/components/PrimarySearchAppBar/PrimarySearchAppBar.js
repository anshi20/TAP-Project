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
  const tealMode = true; // Set tealMode to true for default teal theme

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const theme = createTheme({
    palette: {
      mode: tealMode ? 'dark' : 'light',
      primary: {
        main: '#008080', // Teal for primary color
      },
      secondary: {
        main: '#4db6ac', // Lighter teal for secondary color
      },
      background: {
        default: '#e0f2f1', // Light teal background
        paper: '#b2dfdb', // Medium-light teal for paper elements
      },
      text: {
        primary: '#004d40', // Darker teal for primary text
        secondary: '#00796b', // Slightly lighter teal for secondary text
        disabled: '#80cbc4', // Lighter teal for disabled text
      },
      divider: '#004d40', // Divider color in teal mode
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

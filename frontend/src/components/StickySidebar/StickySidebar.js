import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import './StickySidebar.css';

export default function StickySidebar() {
  const drawerWidth = 250;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: drawerWidth,
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: '#1065c0', // Dark teal greenish color
          color: 'white', // Optional: ensures text is readable
          overflow: 'auto', // Handle overflow of content
          zIndex: 1200, // Ensure it is on top of other content
        }}
      >
        <List>
          {['Home', 'Transactions', 'Portfolio', 'Stocks', 'News'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link} // Use Link component for routing
                to={text === 'Home' ? '/' : `/${text.toLowerCase()}`} // Map text to route
                className="sidebar-item"
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main content area */}
      <Box
        sx={{
          marginLeft: 0,
          flexGrow: 1,
          padding: 20, // Add some padding around the content
        }}
      >
        {/* Your main content goes here */}
      </Box>
    </Box>
  );
}

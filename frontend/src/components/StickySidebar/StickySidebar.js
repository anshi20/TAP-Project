import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import './StickySidebar.css';

export default function StickySidebar() {
  const [open, setOpen] = React.useState(false); // State to handle drawer open/close
  const drawerWidth = 250;

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton 
        color="inherit" 
        aria-label="open drawer" 
        onClick={toggleDrawer}
        sx={{ position: 'absolute', top: 16, left: 16 }} // Position the hamburger icon
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1e7374', // Dark teal greenish color
            color: 'white', // Optional: ensures text is readable
          },
        }}
        anchor="left"
        open={open}
        onClose={toggleDrawer} // Close drawer when clicking outside or using esc
      >
        <Box
          sx={{ width: drawerWidth }}
          role="presentation"
        >
          <List>
            {['Home', 'Transactions', 'Portfolio', 'Stocks', 'News'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  component={Link} // Use Link component for routing
                  to={text === 'Home' ? '/' : `/${text.toLowerCase()}`} // Map text to route
                  className="sidebar-item"
                  onClick={toggleDrawer} // Close drawer on navigation
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

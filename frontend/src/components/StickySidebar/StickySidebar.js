import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom'; // Import Link for routing
import './StickySidebar.css';

export default function StickySidebar() {
  const drawerWidth =250;

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
        className="drawer"
      >
        <Box
          sx={{ width: drawerWidth }}
          role="presentation"
        >
          <List>
            {['Home', 'Transactions', 'Assets', 'Stocks'].map((text, index) => (
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
      </Drawer>
    </Box>
  );
}

"use client"
import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Avatar,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../app/globals.css';

const Navbar = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

  // State to manage the drawer open/close state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // State for user authentication (replace with your own authentication logic)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to toggle the drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolling = window.scrollY > 0;
      if (isScrolling !== scrolling) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Placeholder for user login logic 
  const handleLogin = () => {
    // Add your login logic here
    setIsAuthenticated(true);
  };

  // Placeholder for user logout logic 
  const handleLogout = () => {
    // Add your logout logic here
    setIsAuthenticated(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        className={`${
          scrolling
            ? 'navbar-color' /* Background color when scrolled */
            : 'bg-transparent' /* Transparent background when at the top */
        } transition-colors duration-300 ease-in-out`}
        sx={{
          borderBottom: '0.5px solid white',
        }}
      >
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            aria-label="logo"
            onClick={toggleDrawer}
          >
            <img src="/Page-logo.png" alt="logo" width="50" height="50" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0.4 }}>
            Saudi Life
          </Typography>
          {isMatch ? (
            // Render a button to open the drawer on small screens
            <IconButton
              size="small"
              edge="end"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ display: 'block', ml: 'auto' }}
            >
              <MenuIcon style={{ color: 'white' }} />
            </IconButton>
          ) : (
            // Render the regular navigation buttons on larger screens
            <Stack direction="row" spacing={2}>
              <Button color="inherit">page1</Button>
              <Button color="inherit">page2</Button>
              <Button color="inherit">page3</Button>
              <Button color="inherit">page4</Button>
              <Button color="inherit">page5</Button>
            </Stack>
          )}
          <Box sx={{ ml: 'auto' }}>
            {isAuthenticated ? (
              // Display user profile picture if authenticated
              <Avatar
                alt="User Profile"
                src="" // Replace with the actual image path
              />
            ) : (
              // Display login button if not authenticated
              <Button color="inherit" onClick={handleLogin}>
                Sign in
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer component for small screens */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="page1" />
          </ListItem>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="page2" />
          </ListItem>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="page3" />
          </ListItem>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="page4" />
          </ListItem>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="page5" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;

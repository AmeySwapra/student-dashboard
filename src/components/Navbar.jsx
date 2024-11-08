import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

const activeStyle = {
  backgroundColor: '#fff',
  color: '#333',
  borderRadius: 5,
};

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          component={NavLink}
          to="/"
          sx={{ textDecoration: 'none', color: 'white', flexGrow: 1 }}
        >
          Student CRUD 2.0
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                <ListItem button component={NavLink} to="/home">
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={NavLink} to="/about">
                  <ListItemText primary="About" />
                </ListItem>
                <ListItem button component={NavLink} to="/contact">
                  <ListItemText primary="Contact" />
                </ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          <Stack direction="row" spacing={2}>
            <MenuItem
              component={NavLink}
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Home
            </MenuItem>
            <MenuItem
              component={NavLink}
              to="/about"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              About
            </MenuItem>
            <MenuItem
              component={NavLink}
              to="/contact"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Contact
            </MenuItem>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

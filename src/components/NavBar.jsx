import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function NavBar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#10439F' }}>
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Note Application
      </Typography>
      <Button variant="contained" component={Link} sx={{ marginRight: '8px' }} to="/">Home</Button>
      <Button variant="contained" component={Link} to="/create">Create Note</Button>
    </Toolbar>
  </AppBar>
  );
}

export default NavBar;

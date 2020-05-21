import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, colors } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  color: {
    backgroundColor: colors.deepOrange[400],
  },
}));

function Navbar({ signedIn, setSignedIn }) {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.color}>
        <Typography variant="h6" className={classes.title}>
          Coretex 360
        </Typography>
        {getLoggingButton(signedIn, setSignedIn)}
      </Toolbar>
    </AppBar>
  );
}

function getLoggingButton(signedIn, setSignedIn) {
  let content;
  if (signedIn === '') {
    content = (
      <Button color="inherit" component={NavLink} to="/">
        Login
      </Button>
    );
  } else {
    content = (
      <Button
        color="inherit"
        component={NavLink}
        to="/"
        onClick={() => setSignedIn('')}
      >
        Logout {signedIn}
      </Button>
    );
  }
  return content;
}

export default Navbar;

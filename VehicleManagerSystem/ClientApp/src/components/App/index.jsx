import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from '../Layout/Navbar';
import Login from '../Login';
import Vehicles from '../Vehicles';
import './App.css';
import { AuthContext } from '../../context/authContext';

function App() {
  const [signedIn, setSignedIn] = useState('');

  return (
    <Router>
      <CssBaseline />
      <AuthContext.Provider value={signedIn}>
        <Navbar signedIn={signedIn} setSignedIn={setSignedIn} />
        <Switch>
          <Route path="/" exact>
            <Login setSignedIn={setSignedIn} />
          </Route>
          <Route path="/vehicles" exact>
            <Vehicles />
          </Route>
        </Switch>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;

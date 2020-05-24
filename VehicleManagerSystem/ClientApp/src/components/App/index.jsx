import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from '../Layout/Navbar';
import Login from '../Login';
import VehicleManager from '../VehicleManager';
import { AuthContext } from '../../context/authContext';
import './App.css';

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
            <VehicleManager />
          </Route>
        </Switch>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;

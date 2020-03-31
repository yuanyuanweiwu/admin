import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login';
import admin from './Admin';
const Main = () => {
 return (
  <Router>
   <Route path='/login/' exact component={Login} />
   <Route path='/index/' exact component={admin} />
  </Router>
 );
}

export default Main;

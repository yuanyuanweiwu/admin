import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login';
import admin from './Admin';
import NotFound from './NotFound';
const Main = () => {
 return (
  <Router>
   <Route  path='/' exact component={Login} />
   <Route  path='/login/' exact component={Login} />
   <Route path='/index/'  component={admin} />
   <Route  component={NotFound} />
  </Router>
 );
}

export default Main;

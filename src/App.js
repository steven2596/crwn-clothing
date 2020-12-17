import React from 'react';
import { Route, Link } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';

const Hatpage = () => (
  <div>
    <h1>Welcome to Hats Section!</h1>
  </div>
);


function App() {
  return (
    <div >
      <Route exact path='/' component={HomePage} />
      <Route exact path='/hats' component={Hatpage} />


    </div>
  );
}

export default App;

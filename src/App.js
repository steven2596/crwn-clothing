import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-sign-up-page/sign-in-sign-up-page.component';

import './App.css';

import HomePage from './pages/homepage/homepage.component';

import Shop from './pages/shop/shop.component';

function App() {
  return (
    <div >
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={Shop} />
        <Route path='/signin' component={SignInAndSignUpPage} />
      </Switch>

    </div>
  );
}

export default App;

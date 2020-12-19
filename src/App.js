import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-sign-up-page/sign-in-sign-up-page.component';

import './App.css';

import HomePage from './pages/homepage/homepage.component';

import Shop from './pages/shop/shop.component';

import { auth } from './firebase/firebase.utils';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  //onAuthStateChanged returns a function which removes original function
  //first, it will run original function
  //When onAuthStateChanged is called again, it will unsubscribe and remove the original function
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
      console.log(user);
    })
  }

  //this will unsubscribe open connection
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div >
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={Shop} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    )
  }
}

export default App;

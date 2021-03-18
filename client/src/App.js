import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-sign-up-page/sign-in-sign-up-page.component';
import HomePage from './pages/homepage/homepage.component';
import Shop from './pages/shop/shop.component';
import CheckOut from './pages/checkout/checkout.component';

import { selectCurrentUser } from './redux/user/user.selectors';

import { checkUserSession } from './redux/user/user.actions';

class App extends React.Component {

  componentDidMount() {
    const { checkUserSession } = this.props;

    checkUserSession();
  }

  //this will unsubscribe open connection
  componentWillUnmount() {

  }

  render() {
    return (
      <div >
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={Shop} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
          <Route exact path='/checkout' component={CheckOut} />

        </Switch>
      </div>
    )
  }
}

//After writing this code, we can now use currentUser value from redux state and setCurrentUser method in App Component
//mapStateToProps is for receiving this.state value
//mapDispatchToProps is for using method writtin in a reducer
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

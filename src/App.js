import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setCurrentUser } from './redux/user/user.actions';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';

import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-sign-up-page/sign-in-sign-up-page.component';
import HomePage from './pages/homepage/homepage.component';
import Shop from './pages/shop/shop.component';
import CheckOut from './pages/checkout/checkout.component';

import { selectCurrentUser } from './redux/user/user.selectors';


class App extends React.Component {

  unsubscribeFromAuth = null;

  //onAuthStateChanged returns a function which removes original function
  //first, it will run original function
  //When onAuthStateChanged is called again, it will unsubscribe and remove the original function
  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);

    })
  }

  //this will unsubscribe open connection
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div >
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={Shop} />
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

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

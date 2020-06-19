import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { HomePage } from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import CheckoutPage from './pages/checkout/checkout.component';

import {auth, createUserProfileDocument } from './firebase/firebase.utils';

import CurrentUserContext from './contexts/current-user/current-user.context';

import './App.css';
import './pages/homepage/homepage.styles.scss';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  }

  unsubcribeFromAuth = null

  componentDidMount() {

    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.setState({currentUser: {
            id : snapShot.id,
            ...snapShot.data()
          }});
        })
      }else{
        this.setState({currentUser: userAuth});
      }
     
    })
    
  }
  componentWillUnmount() {
    this.unsubcribeFromAuth();
  }
  render(){
    return (
      <div>
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Header/>
        </CurrentUserContext.Provider>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route path='/signin' render={ () => this.state.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)  } />
        </Switch>
      </div>
    );
  }
  
}

export default App;

import React from 'react';
import { HomePage } from './pages/homepage/homepage.component';
import {Switch, Route} from 'react-router-dom';
import SignInAndSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import {auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';
import './pages/homepage/homepage.styles.scss';

class App extends React.Component {
  constructor() {
    super();

    this.state={
      currentUser: null
    }  
  }
  unsubcribeFromAuth = null

  componentDidMount() {
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser:{
            id : snapShot.id,
            ...snapShot.data()
            }
          });
        })
      }else{
        this.setState({
          currentUser:userAuth
        })
      }
     
    })
    
  }
  componentWillUnmount() {
    this.unsubcribeFromAuth();
  }
  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
  
}

export default App;
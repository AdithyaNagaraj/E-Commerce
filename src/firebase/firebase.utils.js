import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB1qJyVbB1EvmKDKkp0l7sKjY0DuiMEanc",
    authDomain: "crwn-db-b1e26.firebaseapp.com",
    databaseURL: "https://crwn-db-b1e26.firebaseio.com",
    projectId: "crwn-db-b1e26",
    storageBucket: "crwn-db-b1e26.appspot.com",
    messagingSenderId: "968189458993",
    appId: "1:968189458993:web:3b5fa1533a5972361af310",
    measurementId: "G-4KSL15MRH0"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) =>{
      if(!userAuth) return ;

      const userRef =  firestore.doc(`users/${userAuth.uid}`);
      const snapShot = await userRef.get(); 
      //console.log(snapShot);
      if(!snapShot.exists){
          const {displayName, email} =userAuth
          const createdAt = new Date();
          try{
              await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
              });
          }catch (error) {
            console.log('Error While Creating User', error.message)      
          }
      }
      return userRef;
  };  

  firebase.initializeApp(config);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;
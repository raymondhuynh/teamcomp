import * as firebase from 'firebase';
import { browserHistory } from 'react-router';
import currentUser from '../stores/User';

export function watchAuthData(nextState, replace) {
  if (!currentUser.isAuth) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        // localStorage.setItem('currentUser', JSON.stringify(user));
        currentUser.setUser(user);
      } else {
        // No user is signed in.
        console.log('No user is signed in.');
        browserHistory.replace({
          pathname: '/login'
        });
      };
    });
  };
};

export function watchAuthDataLanding(nextState, replace) {
  if (!currentUser.isAuth) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        browserHistory.replace({ pathname: '/lobby' });
      };
    });
  };
};

export function login(email, pw, cb) {
  firebase.auth().signInWithEmailAndPassword(email, pw)
  .then(user => {
    currentUser.setUser(user);
    cb(true);
  })
  .catch(error => {
    cb(false);
  });
}

export function logout() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log('Sign-out successful');
    currentUser.logout();
    browserHistory.replace({ pathname: '/login' });
    // localStorage.removeItem('currentUser');
  }, function(error) {
    // An error happened.
    console.log('Error logging out');
  });
}

export function register(email, pw) {
  return firebase.auth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
    .catch((error) => console.log('Oops', error))
}

export function saveUser (user) {
  return firebase.database().ref().child(`users/${user.uid}`)
    .set({
      email: user.email,
      uid: user.uid,
      unopenedPacks: 0,
      gold: 0,
      silver: 0
    })
    .then(() => user)
}

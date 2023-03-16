import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAubbrqVaqRHXQ3knqMn9zYTK5GgIGQyxg",
    authDomain: "rmap-8b0ba.firebaseapp.com",
    projectId: "rmap-8b0ba",
    storageBucket: "rmap-8b0ba.appspot.com",
    messagingSenderId: "237644826812",
    appId: "1:237644826812:web:26e667c481de547b01a8b9",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
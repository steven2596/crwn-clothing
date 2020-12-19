import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAgeLbLso37E2OzaphWIg_VOKXCLkNL3TQ",
    authDomain: "crwn-db-88e64.firebaseapp.com",
    projectId: "crwn-db-88e64",
    storageBucket: "crwn-db-88e64.appspot.com",
    messagingSenderId: "1010084147144",
    appId: "1:1010084147144:web:4e79514e1459a34b841afd",
    measurementId: "G-HCNCJCKKBP"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;




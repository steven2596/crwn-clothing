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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    //If userAuth is not a valid object returned by Google
    if (!userAuth) return;

    //userRef = documentReference, snapShot = documentSnapshot
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    //If user account does not exist, this block of code will create an account 
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error occurs while creating user account', error.message);
        }

    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;




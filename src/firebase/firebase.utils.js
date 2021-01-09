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

export const addCollectionAndDocuments = async (CollectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(CollectionKey);

    //Because of internet connection, we want whole batch of docs to add to collection if it's successful
    //OR we want adding process of whole batch of docs to fail if it's failed
    //In other words, ALL or Nothing
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        //this will create uid for each object of objectsToAdd Array
        const newDocRef = collectionRef.doc();
        //this will add new documentReference and object to the Batch
        batch.set(newDocRef, obj);
    });
    //this will commit all the writes in this batch.Once all writes have successfully written
    //in the collection, the promise is resolved
    return await batch.commit();
}

//This function take collectionSnapshot as a parameter. collections = collection snapshot
//collections.docs gives us documents of that collection
// doc.data() gives actual data inside that doc
// We will add other infos like routeName, id
export const convertCollectionSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });

    //Eg. hats: {id,item,title,route}
    //Initial object is empty object
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})

};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;




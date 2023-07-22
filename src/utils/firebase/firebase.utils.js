import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAMqUqmnIx9zCU9-6CYbexsvPm3o2HHlq8",
    authDomain: "crwn-clothing-db-3be3e.firebaseapp.com",
    projectId: "crwn-clothing-db-3be3e",
    storageBucket: "crwn-clothing-db-3be3e.appspot.com",
    messagingSenderId: "913166283955",
    appId: "1:913166283955:web:e53dae0a40a6060a0c2cc6"
};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email,
                createdAt
            })
        } catch (error) {
            console.log("Error creating the user ", error.message);
        }
    }

    return userDocRef;
}
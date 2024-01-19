import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged

} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { checkIfMenteeExists, createMentee } from './connect-api.utils';

const firebaseConfig = {
    apiKey: "AIzaSyCylBNsuLOkI0Kr1wYWBWmuU4x8YXAuVvA",  // Okay to have this exposed
    authDomain: "crwn-clothing-db-ac9fd.firebaseapp.com",
    projectId: "crwn-clothing-db-ac9fd",
    storageBucket: "crwn-clothing-db-ac9fd.appspot.com",
    messagingSenderId: "854333886956",
    appId: "1:854333886956:web:764dfac700d849f2dfb0c9"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

// DB related stuff
// DB related stuff
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};

export const createUserUsingBackendApi = async (userAuth, additionalInformation = {}) => {

    try {
        // Check if user already exists
        const exists = await checkIfMenteeExists({ uid: userAuth.uid })

        if (exists) {
            console.log('User already exists. No need to create a new one.');
            return; // Exit the function early if the user already exists
        }
        const displayName = additionalInformation.displayName || userAuth.displayName;
        const email = userAuth.email;
        const uid = userAuth.uid;
        // If user does not exist, proceed with creating the user
        const newMentee = await createMentee({ uid: userAuth.uid, name: displayName, email })
        console.log('newMentee:', newMentee);
        if (newMentee.id) {
            // Handle successful user creation
            return newMentee;
        } else {
            // Handle errors or unsuccessful user creation

            throw new Error(newMentee);
        }
    } catch (error) {
        console.error('Error in creating the mentee using backend API:', error.message);
        throw error; // rethrow the error if you want to handle it outside this function
    }
};

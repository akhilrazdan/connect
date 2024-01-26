import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { checkIfMenteeExists, createUser, getMentee } from './connect-api.utils';

console.log(`API_KEY: ${process.env.REACT_APP_API_KEY}\n
${process.env.REACT_APP_API_KEY}\n
${process.env.REACT_APP_AUTH_DOMAIN}\n
${process.env.REACT_APP_PROJECT_ID}\n
${process.env.REACT_APP_STORAGE_BUCKET}\n
${process.env.REACT_APP_MESSAGING_SENDER_ID}\n
${process.env.REACT_APP_APP_ID}`)
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const getIdTokenResult = async (forceRefresh = false) => await getAuth().currentUser.getIdTokenResult(forceRefresh)
export const getIdTokenBearer = async (forceRefresh = false) => await getAuth().currentUser.getIdToken(forceRefresh)

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
// TODO(akhilz) Move to connect api 
export const createUserUsingBackendApi = async (userAuth, additionalInformation = {}) => {

    try {
        const displayName = additionalInformation.displayName || userAuth.displayName;
        const email = userAuth.email;
        // If user does not exist, proceed with creating the user
        const userDetails = await getMentee({});
        if (!userDetails) {
            const response = await createUser({ name: displayName, email })
            console.log('newMentee:', JSON.stringify(response));
            if (!response.error) {
                // Handle successful user creation
                return response.user;
            } else {
                // Handle errors or unsuccessful user creation
                throw new Error(response.data);
            }
        }
    } catch (error) {
        console.error('Error in creating the mentee using backend API:', error)
        throw error; // rethrow the error if you want to handle it outside this function
    }
};

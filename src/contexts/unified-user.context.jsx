import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener, getIdTokenResult } from '../utils/firebase/firebase.utils';

export const UnifiedUserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
    isSignInProcessComplete: true,
    setSignInProcessComplete: () => { },
    role: null,
    setRole: () => { },
    // Other state setters as needed
});

export const UnifiedUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state
    const [isSignInProcessComplete, setSignInProcessComplete] = useState(false); // Add this line
    const [role, setRole] = useState('guest'); // Add this line

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user) => {
            setLoading(true);
            console.log(`Current user changed to ${JSON.stringify(user)}`)
            if (user) {
                const idTokenResult = await getIdTokenResult()
                setCurrentUser({
                    ...user
                });
                setRole(idTokenResult.claims?.role ?? 'guest')
            } else {
                // Reset state when user signs out
                setCurrentUser(null);
                setRole(null);
            }
            setLoading(false); // Stop loading
        });
        return unsubscribe;
    }, []);

    const value = { currentUser, loading, setCurrentUser, setSignInProcessComplete, isSignInProcessComplete, role, setRole };
    return <UnifiedUserContext.Provider value={value}>{children}</UnifiedUserContext.Provider>;
};
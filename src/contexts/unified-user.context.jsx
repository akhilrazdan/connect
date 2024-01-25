import React, { createContext, useState, useEffect, useRef } from 'react';
import { onAuthStateChangedListener, getIdTokenResult } from '../utils/firebase/firebase.utils';
import { getMentee } from '../utils/firebase/connect-api.utils';

export const UnifiedUserContext = createContext({
    currentUser: null,
    userMetadata: null,
    // Other state setters as needed
});

export const UnifiedUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const initializationDone = useRef(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user) => {
            if (user && !initializationDone.current) {
                // Fetch user metadata when user is authenticated
                try {
                    console.log("calling getMentee", user)
                    await getMentee({});

                    const idTokenResult = await getIdTokenResult(true);
                    setCurrentUser({
                        ...user,
                        role: idTokenResult.claims?.role ?? 'guest'
                    });
                    initializationDone.current = true;

                } catch (error) {
                    console.error('Error fetching user metadata:', error);
                    // Set an error state or handle as appropriate
                }
            } else {
                // Reset state when user signs out
                setCurrentUser(null);
                initializationDone.current = false;
            }
        });
        return unsubscribe;
    }, []);

    const value = { currentUser };
    return <UnifiedUserContext.Provider value={value}>{children}</UnifiedUserContext.Provider>;
};
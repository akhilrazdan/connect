import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener, getIdTokenResult, auth } from '../utils/firebase/firebase.utils';
import { createUserUsingBackendApi, isUserAllowListed } from '../utils/firebase/connect-api.utils';
import { useNavigate } from 'react-router-dom';

export const UnifiedUserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
    role: null,
    setRole: () => { },
    isMenteeLoggedIn: false,
    setMenteeLoggedIn: () => { },
    // Other state setters as needed
});

export const UnifiedUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isInitialLogin, setIsInitialLogin] = useState(false); // New state
    const [role, setRole] = useState('guest');
    const [isMenteeLoggedIn, setMenteeLoggedIn] = useState(false);
    const navigate = useNavigate();
    console.log("Running User provider with current user", currentUser, isMenteeLoggedIn)
    // Handle changes in the 'role' state
    useEffect(() => {
        console.log(`useEffect triggered ${JSON.stringify(currentUser)}, ${role}`);
        if (currentUser && role === 'mentee') {
            setMenteeLoggedIn(true);
            console.log("Redirecting")
            navigate(('/'))
            setIsInitialLogin(false); // Reset flag after navigating
        } else {
            setMenteeLoggedIn(false);
            // You may add additional logic here if needed when the role changes
        }
    }, [role, currentUser]);

    const refreshUserClaims = async () => {
        const user = auth.currentUser;

        if (user) {
            await user.getIdToken(true); // Force a token refresh
            const idTokenResult = await getIdTokenResult(user);

            // Use the claims from idTokenResult for your application logic
            console.log(`Setting role from ${role} to ${idTokenResult.claims.role}`)
            setRole(idTokenResult.claims.role);

            // If you need to update the user object in your state, 
            // consider augmenting it with the new claims
            setCurrentUser({ ...user, role: idTokenResult.claims.role });
        }
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user) => {
            console.log(`Current user changed to ${JSON.stringify(user)}`)
            if (user) {
                setIsInitialLogin(true); // Set flag on user login
                await refreshUserClaims()
            } else {
                // Reset state when user signs out
                setCurrentUser(null);
                console.log(`Setting role from ${role} to null}`)
                setRole(null);
                setIsInitialLogin(false); // Reset flag after navigating
                setMenteeLoggedIn(false);
            }
        });
        return unsubscribe;
    }, []);

    const value = { currentUser, setCurrentUser, role, setRole, isMenteeLoggedIn };
    return <UnifiedUserContext.Provider value={value}>{children}</UnifiedUserContext.Provider>;
};
import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener, getIdTokenResult, auth } from '../utils/firebase/firebase.utils';
import { useNavigate } from 'react-router-dom';
import { createUserUsingBackendApi } from '../utils/firebase/connect-api.utils';

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
    useEffect(() => {
        if (isMenteeLoggedIn) {
            console.log("Users: Redirecting to /")
            navigate('/')
        } else {
            console.log(`Users: useEffect based on isMenteeLoggedIn but not changing anything`)
        }
    }, [isMenteeLoggedIn])
    useEffect(() => {
        const createUser = async (user) => {
            await createUserUsingBackendApi(user);
            console.log(`Users: Maybe created user isMenteeLoggedIn : true`);
            setMenteeLoggedIn(true);
            setIsInitialLogin(false); // Reset flag after navigating
        }
        console.log(`Users: Recieved ${role} & ${JSON.stringify(currentUser)} `);
        if (currentUser && role === 'mentee') {
            createUser(currentUser);
        } else {
            setMenteeLoggedIn(false);
            // You may add additional logic here if needed when the role changes
        }
    }, [role, currentUser]);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user) => {
            console.log(`Users: Current user changed to ${JSON.stringify(user)}`)
            if (user) {
                setIsInitialLogin(true); // Set flag on user login

                const idTokenResult = await getIdTokenResult(true);
                console.log(`Setting role from ${role} to ${idTokenResult.claims.role}`)
                setRole(idTokenResult.claims.role);
                // If you need to update the user object in your state, 
                // consider augmenting it with the new claims
                setCurrentUser({ ...user, role: idTokenResult.claims.role });
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
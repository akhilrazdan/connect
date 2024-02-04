import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener, getIdTokenResult, auth } from '../utils/firebase/firebase.utils';
import { createUser, createUserUsingBackendApi, getUser } from '../utils/firebase/connect-api.utils';
import { useLocation, useNavigate } from 'react-router-dom';

export const UnifiedUserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
    role: null,
    setRole: () => { },
    isMenteeLoggedIn: false,
    setMenteeLoggedIn: () => { },
    createUserFunction: null,
    setCreateUserFunction: () => { },
    // Other state setters as needed
});

export const UnifiedUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [role, setRole] = useState('guest');
    const [isMenteeLoggedIn, setMenteeLoggedIn] = useState(false);
    const [createUserFunction, setCreateUserFunction] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        console.log(`Users: useEffect based on isMenteeLoggedIn ${isMenteeLoggedIn}`)
        if (isMenteeLoggedIn) {
            const originalPath = location.state?.from || '/';
            console.log(`Users: Authenticated, redirecting to ${originalPath}`)
            navigate(originalPath)
        }
    }, [isMenteeLoggedIn])

    useEffect(() => {
        if (currentUser && role == 'mentee') {
            setMenteeLoggedIn(true)
        } else if (currentUser && role == 'guest') {
            console.log(`Navigating to / unauthorized`)
            navigate('/unauthorized')
        }
    }, [currentUser, role])

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user) => {
            console.log(`Users: Current user changed to ${JSON.stringify(user)} `)
            if (user) {
                const userDetails = await getUser()
                if (userDetails) {
                    if (userDetails.role_name) {
                        console.log(`Users: Setting role for ${userDetails.uid} to ${userDetails.role_name ?? 'guest'} `)
                        setRole(userDetails.role_name ?? 'guest')
                    }
                    const updatedUser = { ...user, role: role };
                    setCurrentUser(updatedUser);
                } else {
                    console.log(`User: No user details found for ${user.uid}.This can happen when you are in the middle of user creation.Skipping...`)
                }
            } else {
                // Reset state when user signs out
                setCurrentUser(null);
                console.log(`Setting role from ${role} to null`)
                setRole(null);
                setMenteeLoggedIn(false);
            }
        });
        return unsubscribe;
    }, []);

    const value = { currentUser, setCurrentUser, role, setRole, createUserFunction };
    return <UnifiedUserContext.Provider value={value}>{children}</UnifiedUserContext.Provider>;
};
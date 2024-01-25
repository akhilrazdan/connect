import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/user.context'; // Import UserContext
import { getMentee } from '../utils/firebase/connect-api.utils';

export const UserMetadataContext = createContext({
    userMetadata: null,
    setUserMetadata: () => { }, // Set the user metadata in the context
});

export const UserMetadataProvider = ({ children }) => {
    const [userMetadata, setUserMetadata] = useState(null);
    const { currentUser } = useContext(UserContext); // Get the current user from UserContext

    useEffect(() => {
        const fetchUserDetails = async () => {
            console.log("1. currentUser", currentUser)
            if (currentUser && currentUser.uid) {
                try {
                    const response = await getMentee({});
                    console.log(`userMetadata ${JSON.stringify(response)}`)
                    setUserMetadata(response)
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            } else {
                setUserMetadata(null)
            }
        };

        fetchUserDetails();
    }, [currentUser]); // Refetch when currentUser changes

    const value = { userMetadata, setUserMetadata }
    return (
        <UserMetadataContext.Provider value={value}>
            {children}
        </UserMetadataContext.Provider>
    );
};

import { useState, createContext, useEffect, useContext } from 'react';

import MENTORS from '../assets/mentors-list.json'
import { UserMetadataContext } from './user-metadata.context';
import { getMentorsForMentee } from '../utils/firebase/connect-api.utils';

export const MentorsContext = createContext({
    mentors: [],
});

export const MentorsProvider = ({ children }) => {
    const [mentors, setMentors] = useState(MENTORS);
    const { userMetadata } = useContext(UserMetadataContext);
    const value = { mentors: mentors };
    useEffect(() => {
        const getMentors = async () => {
            console.log("Inside useEffect")
            if (userMetadata && userMetadata.uid) {
                try {
                    console.log("Getting mentors for menteeId", userMetadata.uid)
                    const mentors = await getMentorsForMentee({ uid: userMetadata.uid });
                    console.log("Got mentors", mentors)
                    setMentors(mentors);
                } catch (error) {
                    console.error('Error fetching mentors:', error);
                    // Handle the error appropriately (e.g., setting an error state, showing a message, etc.)
                }
            }
        }
        getMentors()
    }, [userMetadata])

    return (
        <MentorsContext.Provider value={value}>
            {children}
        </MentorsContext.Provider>
    )
}
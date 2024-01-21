import { useState, createContext, useEffect, useContext } from 'react';

// import MENTORS from '../assets/mentors-list.json'
import { UserMetadataContext } from './user-metadata.context';
import { getMentorsForMentee } from '../utils/firebase/connect-api.utils';

export const MentorsContext = createContext({
    mentors: [],
});

export const MentorsProvider = ({ children }) => {
    const [mentors, setMentors] = useState([]);
    const { userMetadata } = useContext(UserMetadataContext);

    const refreshMentors = async () => {
        if (userMetadata && userMetadata.uid) {
            try {
                const mentors = await getMentorsForMentee({ uid: userMetadata.uid });
                setMentors(mentors);
            } catch (error) {
                console.error('Error fetching mentors:', error);
            }
        }
    };

    useEffect(() => {
        refreshMentors()
    }, [userMetadata])

    const value = { mentors: mentors, refreshMentors };

    return (
        <MentorsContext.Provider value={value}>
            {children}
        </MentorsContext.Provider>
    )
}
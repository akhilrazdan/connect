import { useState, createContext, useEffect, useContext } from 'react';

// import MENTORS from '../assets/mentors-list.json'
import { UserMetadataContext } from './user-metadata.context';
import { getMentorsForMentee } from '../utils/firebase/connect-api.utils';

export const MentorsContext = createContext({
    mentors: [],
    mentorsMap: {}
});

export const MentorsProvider = ({ children }) => {
    const [mentors, setMentors] = useState([]);
    const [mentorsMap, setMentorsMap] = useState({});
    const { userMetadata } = useContext(UserMetadataContext);

    const refreshMentors = async () => {
        if (userMetadata && userMetadata.uid) {
            try {
                const mentors = await getMentorsForMentee({ uid: userMetadata.uid });
                setMentors(mentors);
                // group mentors into a map by iaf key
                const groupedMentors = mentors.reduce((accumulator, mentor) => {
                    // If the accumulator does not have the key for this 'iaf', create it
                    if (!accumulator[mentor.iaf_name]) {
                        accumulator[mentor.iaf_name] = [];
                    }

                    // Push the current mentor to the array for this 'iaf'
                    accumulator[mentor.iaf_name].push(mentor);

                    // Return the accumulator for the next iteration
                    return accumulator;
                }, {}); // Initialize the accumulator as an empty object
                console.log('mentors', mentors);
                console.log('groupedMentors', groupedMentors);
                setMentorsMap(groupedMentors);
            } catch (error) {
                console.error('Error fetching mentors:', error);
            }
        }
    };

    useEffect(() => {
        refreshMentors()
    }, [userMetadata])

    const value = { mentors: mentors, refreshMentors, mentorsMap };

    return (
        <MentorsContext.Provider value={value}>
            {children}
        </MentorsContext.Provider>
    )
}
import { useState, createContext, useEffect, useContext } from 'react';

// import MENTORS from '../assets/mentors-list.json'
import { getMentorsForMentee } from '../utils/firebase/connect-api.utils';
import { UnifiedUserContext } from './unified-user.context';

export const MentorsContext = createContext({
    mentorsGroupedByIaf: {},
    refreshMentors: () => { },
    signupsTotal: 0,
    maxMenteeChoices: 0,
    choicesRemaining: 0,
});

export const MentorsProvider = ({ children }) => {
    const { currentUser } = useContext(UnifiedUserContext);

    const [mentorsGroupedByIaf, setMentorsGroupedByIaf] = useState({});
    const [signupsTotal, setSignupsTotal] = useState(0);
    const [maxMenteeChoices, setMaxMenteeChoices] = useState(3)
    const [choicesRemaining, setChoicesRemaining] = useState(maxMenteeChoices - signupsTotal)

    const refreshMentors = async () => {
        console.log('Refreshing mentors')
        if (currentUser && currentUser.uid) {
            try {
                console.log(`currentUser oho${JSON.stringify(currentUser)}`)
                const { mentors, signupsTotal, maxMenteeChoices } = await getMentorsForMentee({});
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
                setMentorsGroupedByIaf(groupedMentors);
                setSignupsTotal(signupsTotal);
                setMaxMenteeChoices(maxMenteeChoices);
                setChoicesRemaining(maxMenteeChoices - signupsTotal); // Calculate the number of choices remaining for the user
            } catch (error) {
                console.error('Error fetching mentors:', error);
            }
        }
    };

    useEffect(() => {
        // Reset state when user changes (e.g., user signs out or signs in)
        setMentorsGroupedByIaf({});
        setSignupsTotal(0);
        setMaxMenteeChoices(3);
        setChoicesRemaining(3); // Assuming 3 is the initial value for maxMenteeChoices

        // Fetch mentors if a new user signs in
        if (currentUser && currentUser.uid) {
            refreshMentors()
        }
    }, [currentUser])

    const value = { refreshMentors, mentorsGroupedByIaf, signupsTotal, maxMenteeChoices, choicesRemaining };

    return (
        <MentorsContext.Provider value={value}>
            {children}
        </MentorsContext.Provider>
    )
}
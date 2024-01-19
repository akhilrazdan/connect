import { useState, createContext } from 'react';

import MENTORS from '../assets/mentors-list.json'

export const MentorsContext = createContext({
    mentors: [],
});

export const MentorsProvider = ({ children }) => {
    const [mentors, setMentors] = useState(MENTORS);
    const value = { mentors: mentors };

    return (
        <MentorsContext.Provider value={value}>
            {children}
        </MentorsContext.Provider>
    )
}
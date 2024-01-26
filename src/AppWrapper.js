import React, { useEffect } from 'react';
import App from './App';
import { UnifiedUserContext } from './contexts/unified-user.context';
import { useContext } from 'react';
import { MentorsProvider } from './contexts/mentors.context';

const AppWrapper = () => {
    const { role } = useContext(UnifiedUserContext);
    console.log(`Reloading app because role changed to ${role}`)
    return (
        role === 'mentee' ? (
            <MentorsProvider>
                <App />
            </MentorsProvider>
        ) : (
            <App />
        )
    );
};

export default AppWrapper;

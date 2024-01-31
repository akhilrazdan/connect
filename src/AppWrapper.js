import React, { useEffect } from 'react';
import App from './App';
import { UnifiedUserContext } from './contexts/unified-user.context';
import { useContext } from 'react';
import { MentorsProvider } from './contexts/mentors.context';

const AppWrapper = () => {
    const { isMenteeLoggedIn } = useContext(UnifiedUserContext);
    console.log(`Reloading AppWrapper based on menteeLoggedIn ${isMenteeLoggedIn})
}`)
    return (
        isMenteeLoggedIn ? (
            <MentorsProvider>
                <App />
            </MentorsProvider>
        ) : (
            <App />
        )
    );
};

export default AppWrapper;

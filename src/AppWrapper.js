import React from 'react';
import App from './App';
import { UnifiedUserContext } from './contexts/unified-user.context';
import { useContext } from 'react';
import { MentorsProvider } from './contexts/mentors.context';

const AppWrapper = () => {
    const { currentUser } = useContext(UnifiedUserContext);

    return (
        currentUser?.role === 'student' ? (
            <MentorsProvider>
                <App />
            </MentorsProvider>
        ) : (
            <App />
        )
    );
};

export default AppWrapper;

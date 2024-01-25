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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

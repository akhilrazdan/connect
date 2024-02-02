import React from 'react';
import App from './App';
import { MentorsProvider } from './contexts/mentors.context';

const AppWrapper = () => {
    console.log(`Reloading AppWrapper`)
    return (
        <MentorsProvider>
            <App />
        </MentorsProvider>
    );
};

export default AppWrapper;

import React from 'react';
import App from './App';
import { UserContext, UserProvider } from './contexts/user.context';
import { useContext } from 'react';
import { MentorsProvider } from './contexts/mentors.context';
import { UserMetadataProvider } from './contexts/user-metadata.context';

const AppWrapper = () => {
    const { currentUser } = useContext(UserContext);
    console.log(`From AppWrapper ${currentUser}`);

    return (
        <UserMetadataProvider>
            {currentUser?.role === 'student' ? (
                <MentorsProvider>
                    <App />
                </MentorsProvider>
            ) : (
                <App />
            )}
        </UserMetadataProvider>
    );
};

export default AppWrapper;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


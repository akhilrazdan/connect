import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UnifiedUserProvider as UserProvider } from './contexts/unified-user.context';

import './index.scss';
import AppWrapper from './AppWrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <UserProvider>
            <AppWrapper />
        </UserProvider>
    </BrowserRouter>
);

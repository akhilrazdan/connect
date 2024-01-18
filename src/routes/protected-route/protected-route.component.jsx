import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './path-to-your-auth-hook'; // Import your authentication hook

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useAuth(); // Replace with your method of checking auth status

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/auth" />
                )
            }
        />
    );
};
export default ProtectedRoute;
import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import { UserContext } from "../../contexts/user.context";


const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useContext(UserContext); // Replace with your method of checking auth status

    if (!isAuthenticated) {
        // User is not authenticated, redirect to the auth page
        return <Navigate to="/auth" />;
    }

    // User is authenticated, render the component
    return <Component {...rest} />;
};

export default ProtectedRoute;
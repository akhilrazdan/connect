import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import { UnifiedUserContext } from "../../contexts/unified-user.context";

const ProtectedRoute = ({ element: Component, roles, ...rest }) => {
    const { currentUser } = useContext(UnifiedUserContext);

    if (!currentUser) {
        // User is not authenticated, redirect to the auth page
        return <Navigate to="/auth" />;
    }

    if (roles && !roles.includes(currentUser.role)) {
        // User does not have the right role, redirect or show unauthorized
        return <Navigate to="/unauthorized" />;
    }

    // User is authenticated and has the right role, render the component
    return <Component {...rest} />;
};

export default ProtectedRoute;
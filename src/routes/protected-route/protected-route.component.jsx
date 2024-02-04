import { useContext } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { UnifiedUserContext } from "../../contexts/unified-user.context";

const ProtectedRoute = ({ element: Component, roles }) => {
    const location = useLocation();
    const { currentUser, role } = useContext(UnifiedUserContext);
    console.log("ProtectedRoute rendering for path: ", location.pathname);

    if (!currentUser) {
        console.log(`Protected: User is not authenticated, redirect to auth`)
        return <Navigate to="/auth" />;
    }

    if (roles && !roles.includes(role)) {
        console.log(`Protected: User does not have the right role ${role}, redirect or show unauthorized`)
        return <Navigate to="/unauthorized" />;
    }

    // User is authenticated and has the right role, render the component
    console.log(`Protected: User is authenticated and has the right role ${role}, render the component`)
    return <Component />;
};

export default ProtectedRoute;
import { useContext } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { UnifiedUserContext } from "../../contexts/unified-user.context";
import Unauthorized from "../../components/unauthorized/unauthorized.component";

const ProtectedRoute = ({ element: Component, roles }) => {
    const location = useLocation();
    const { currentUser, role } = useContext(UnifiedUserContext);
    console.log("ProtectedRoute rendering for path: ", location.pathname);

    if (!currentUser) {
        console.log(`Protected: User is not authenticated, redirect to auth. Setting state: ${location.pathname}`)
        return <Navigate to="/auth" state={{ from: location.pathname }} />;
    }

    if (roles && !roles.includes(role)) {
        console.log(`Protected: User does not have the right role ${role}, redirect or show unauthorized`)
        if (role === 'mentee') {
            // Redirect mentee to home if unauthorized
            return <Navigate to="/" />;
        } else {
            // Render Unauthorized component for other roles
            return <Unauthorized />;
        }
    }

    // User is authenticated and has the right role, render the component
    console.log(`Protected: User is authenticated and has the right role ${role}, render the component`)
    return <Component />;
};

export default ProtectedRoute;
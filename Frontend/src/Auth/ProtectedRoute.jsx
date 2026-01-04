import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

export const ProtectedRoute = ({ children }) => {
    const { isSignedIn, isLoaded } = useAuth();

    if(!isLoaded) return null;
    if(!isSignedIn) return <Navigate to='/sign-in' />

    return children;
}


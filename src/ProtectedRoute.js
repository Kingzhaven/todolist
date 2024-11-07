import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// Component to protect routes that require authentication
const ProtectedRoute = ({ children, isAuthenticated }) => {
    const [showMessage, setShowMessage] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            // Show a sign-in message for 3 seconds, then redirect to login
            setShowMessage(true);

            const messageTimer = setTimeout(() => {
                setShowMessage(false);
                setRedirect(true);
            }, 3000);
            // Clear timer on component unmount or if isAuthenticated changes
            return () => clearTimeout(messageTimer);
        }
    }, [isAuthenticated]);

     // If authenticated, render child components; otherwise, show message and redirect
    return isAuthenticated ? (
        children
    ) : (
        <>
            {showMessage && (
                <div className="sign-in-message">
                    <p>Please sign in to access this page.</p>
                </div>
            )}
            {redirect && <Navigate to="/login" />}
        </>
    );
};

export default ProtectedRoute;

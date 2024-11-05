import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
// Prevent Todo access without signin.
const ProtectedRoute = ({ children, isAuthenticated }) => {
    const [showMessage, setShowMessage] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            setShowMessage(true);

            const messageTimer = setTimeout(() => {
                setShowMessage(false);
                setRedirect(true);
            }, 3000);

            return () => clearTimeout(messageTimer);
        }
    }, [isAuthenticated]);

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

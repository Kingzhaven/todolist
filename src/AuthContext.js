import React, { createContext, useContext, useState } from "react";

// Create an authentication context to manage login state across the application
const AuthContext = createContext();

// Custom hook to access authentication context values
export const useAuth = () => useContext(AuthContext);

// Provider component to wrap around parts of the app that need access to authentication state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to log in a user by setting isAuthenticated to true
  const login = () => setIsAuthenticated(true);

  // Function to log out a user by setting isAuthenticated to false
  const logout = () => setIsAuthenticated(false);

  return (
    // Provide authentication state and functions to any component wrapped in AuthProvider
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

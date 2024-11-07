import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import TodoApp from './TodoApp';
import Navbar from './Navbar';
import Login from './Login';
import SignUp from './SignUp';
import ProtectedRoute from './ProtectedRoute';
import './App.css';

function App() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    // Function to handle user sign-out, clears username and redirects to login page
    const signOut = () => {
        setUsername('');
        navigate('/login');
    };

    return (
        <div className="App">
            <Navbar username={username} signOut={signOut} />
            <Routes>
                <Route path="/" element={<Login setUsername={setUsername} />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login setUsername={setUsername} />} />
                <Route 
                    path="/todos" 
                    element={
                        <ProtectedRoute isAuthenticated={!!username}>
                            <TodoApp />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </div>
    );
}

export default App;

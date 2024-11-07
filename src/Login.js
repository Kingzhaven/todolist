import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
// Login check database for username / password
const Login = ({ setUsername }) => {
    const [userInput, setUserInput] = useState(''); 
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Handle login form submission and check credentials
    const handleLogin = (e) => {
        e.preventDefault();

        // Send login credentials to server for authentication
        axios.post('http://localhost:5000/login', { username: userInput, password })
            .then((response) => {
                if (response.data.success) {
                    // On success, set the username in parent component and navigate to the Todo page
                    setUsername(userInput); 
                    navigate('/todos');
                } else {
                    // Display error message if login is unsuccessful
                    setErrorMessage(response.data.message);
                }
            })
            .catch((error) => {
                // Handle any errors from the server or network issues
                setErrorMessage('Error during login');
                console.error('Login error:', error);
            });
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="login-button">Login</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default Login;
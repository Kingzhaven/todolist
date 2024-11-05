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

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/login', { username: userInput, password })
            .then((response) => {
                if (response.data.success) {
                    setUsername(userInput); 
                    navigate('/todos');
                } else {
                    setErrorMessage(response.data.message);
                }
            })
            .catch((error) => {
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
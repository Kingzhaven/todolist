import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
// Check if Password meets minimum requirements
    const isPasswordValid = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);

        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    };
// Checks for check box, password, and matching
    const handleSignUp = async (e) => {
        e.preventDefault();
    
        if (!isPasswordValid(password)) {
            setErrorMessage(
                'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.'
            );
            return;
        }
    
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        if (!termsAccepted) {
            setErrorMessage('You must accept the terms and conditions.');
            return;
        }
    
        try {
            const checkResponse = await axios.post('http://localhost:5000/check-username', { username });
    
            if (checkResponse.data.exists) {
                setErrorMessage('Username already taken.');
                return;
            }
    
            const response = await axios.post('http://localhost:5000/signup', { username, password });
    
            if (response.data.success) {
                setSuccessMessage('Sign-up successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/todos');
                }, 2000);
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage('Username already taken.');
            console.error('Sign-up error:', error);
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp} className="signup-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required />
                <div className="terms">
                    <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)} />
                    <label>
                        I accept the <a href="/terms" target="_blank" rel="noopener noreferrer">terms and conditions</a>
                    </label>
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default SignUp;

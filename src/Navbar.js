import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ username, signOut }) => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                {username && <li className="navbar-item">Welcome, {username}</li>}
                <li className="navbar-item"><Link to="/todos">Todo App</Link></li>
                {!username ? (
                    <>
                        <li className="navbar-item"><Link to="/login">Login</Link></li>
                        <li className="navbar-item"><Link to="/signup">Sign Up</Link></li>
                    </>
                ) : (
                    <li className="navbar-item" style={{ marginLeft: 'auto' }}>
                        <button className="signout-button" onClick={signOut}>Sign Out</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

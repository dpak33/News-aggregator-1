import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import '../styling/Header.css';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const isUserLoggedIn = () => {
        return localStorage.getItem('user') !== null;
    };

    const logoutUser = () => {
        localStorage.removeItem('user');
        toast.success('User logged out');
        navigate("/"); // or use the navigate function from 'react-router-dom' if you have it available
    };

    return (
        <header className="header">
            <div className="icon-wrapper">
                <i
                    className="close-icon material-symbols-outlined"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    menu_open
                </i>
            </div>
            {isOpen && (
                <ul className="dropdown">
                    {isUserLoggedIn() ? (
                        <li onClick={logoutUser}>
                            <a href="/">Logout</a> {/* You can replace this with a button or any other element */}
                        </li>
                    ) : (
                        <li>
                            <Link to="/login">Login/Signup</Link>
                        </li>
                    )}
                    <li>Most Recent</li>
                    <li>Most Popular</li>
                    <li>Your Saved Articles</li>
                </ul>
            )}
            <h1>News Aggregator</h1>
            <span className="production-icon">Pakenham Productions</span>
        </header>
    )
}

export default Header;
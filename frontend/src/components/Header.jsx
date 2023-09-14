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
        navigate("/");
    };

    return (
        <header className="header">
            <div className="icon-and-dropdown-wrapper">
                <div className="icon-wrapper">
                    <i
                        className="close-icon material-symbols-outlined"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        menu_open
                    </i>
                </div>
            </div>
            {isOpen && (
                <ul className="dropdown">
                    {isUserLoggedIn() ? (
                        <li onClick={logoutUser}>
                            <Link to="#">Logout</Link> {/* You can replace this with a button or any other element */}
                        </li>
                    ) : (
                        <li>
                            <Link to="/login">Login/Signup</Link>
                        </li>
                    )}
                    <li>
                        <Link to="/mostrecent">Most Recent</Link>
                    </li>
                    <li>
                        <Link to="/mostpopular">Most Popular</Link>
                    </li>
                    <li>
                        <Link to="/yoursaved">Your Saved</Link>
                    </li>
                </ul>
            )}
            <h1>News Aggregator</h1>
            <span className="production-icon">Pakenham Productions</span>
        </header>
    )
}

export default Header;
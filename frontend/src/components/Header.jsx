import React, { useState } from 'react';
import '../styling/Header.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="header">
            <i
                className="close-icon material-symbols-outlined"
                onClick={() => {
                    console.log("clicked!");
                    setIsOpen(!isOpen)
                }}
            >menu_open
            </i>
            {
                isOpen && (
                    <ul className="dropdown">
                        <li>Most Recent</li>
                        <li>Most Popular</li>
                        <li>Your Saved Articles</li>
                    </ul>
                )
            }
            <h1>News Aggregator</h1>
            <span className="production-icon">Pakenham Productions</span>
        </header >
    )
}

export default Header;
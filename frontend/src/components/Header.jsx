import React, { useState } from 'react';
import '../styling/Header.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="header">
            <div className="icon-wrapper"> {/* Wrap the icon with a div */}
                <i
                    className="close-icon material-symbols-outlined"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    menu_open
                </i>
            </div>
            {isOpen && (
                <ul className="dropdown">
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
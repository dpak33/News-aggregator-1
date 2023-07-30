import React from 'react';
import '../styling/Header.css';

const Header = () => {
    return (
        <header className="header">
            <i className="close-icon material-symbols-outlined">
                menu_open
            </i>
            <h1>News Aggregator</h1>
            <span className="production-icon">Pakenham Productions</span>
        </header>
    )
}

export default Header;
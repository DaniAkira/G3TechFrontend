import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header 
            className="header"
            onClick={() => window.location.href = '/'}
            >
            <img 
                src="../assets/logoSimbolo.png" 
                alt="Logo" 
                className="logo1" 
            />
            <img 
                src="../assets/logoEscrito-removebg-preview.png" 
                alt="Logo" 
                className="logo2" 
            />
        </header>
    );
}

export default Header;
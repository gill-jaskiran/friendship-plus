import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/about">About</Link></li>
        <li className="navbar-item"><Link to="/signup">Signup</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;


import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;
    
    if (dropdownVisible) {
      timeoutId = setTimeout(() => {
        setDropdownVisible(false);
      }, 10000); // 10 seconds in milliseconds
    }

    // Cleanup function to clear timeout if component unmounts or dropdown is closed manually
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [dropdownVisible]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/mijn-account');
  };

  return (
    <nav className="navbar">
      <h2>VakantieWijzer</h2>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/bestemmingen">Bestemmingen</NavLink></li>
        <li><NavLink to="/keuzehulp">Keuzehulp</NavLink></li>
        <li><NavLink to="/reis-check">Reis Check</NavLink></li>
        <li><NavLink to="/mijn-favorieten">Mijn Favorieten</NavLink></li>
        <li className="account-dropdown">
          <button
            className="account-button"
            onClick={() => setDropdownVisible(!dropdownVisible)}
          >
            Mijn Account
          </button>
          {dropdownVisible && (
            <div className="dropdown-menu">
              <NavLink to="/account">Accountoverzicht</NavLink>
              <button onClick={handleLogout}>Uitloggen</button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
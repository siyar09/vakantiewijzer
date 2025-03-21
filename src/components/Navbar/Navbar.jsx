import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaUserCheck } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // Add new useEffect for dropdown timeout
  useEffect(() => {
    let timeoutId;
    
    if (dropdownVisible) {
      timeoutId = setTimeout(() => {
        setDropdownVisible(false);
      }, 3000); // 3 seconds
    }

    // Cleanup timeout if component unmounts or dropdown is closed manually
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [dropdownVisible]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setDropdownVisible(false); // Close dropdown after logout
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
            {isLoggedIn ? <FaUserCheck className="user-icon" /> : <FaUserCircle className="user-icon" />}
            <span>Mijn Account</span>
          </button>
          {dropdownVisible && (
            <div className="dropdown-menu">
              {isLoggedIn ? (
                <>
                  <NavLink to="/account">Accountoverzicht</NavLink>
                  <button onClick={handleLogout}>Uitloggen</button>
                </>
              ) : (
                <NavLink to="/mijn-account">Inloggen</NavLink>
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
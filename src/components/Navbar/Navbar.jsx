import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
        <li><Link to="/">Home</Link></li>
        <li><Link to="/bestemmingen">Bestemmingen</Link></li>
        <li><Link to="/keuzehulp">Keuzehulp</Link></li>
        <li><Link to="/reis-check">Reis Check</Link></li>
        <li><Link to="/mijn-favorieten">Mijn Favorieten</Link></li>
        <li className="account-dropdown">
          <button
            className="account-button"
            onClick={() => setDropdownVisible(!dropdownVisible)}
          >
            Mijn Account
          </button>
          {dropdownVisible && (
            <div className="dropdown-menu">
              <Link to="/account">Accountoverzicht</Link>
              <button onClick={handleLogout}>Uitloggen</button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
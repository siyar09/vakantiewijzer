import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle, FaUserCheck, FaHome, FaGlobe, FaCompass, FaClipboardCheck, FaHeart } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setDropdownVisible(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setDropdownVisible(false);
    navigate('/mijn-account');
  };

  const navItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/bestemmingen', label: 'Bestemmingen', icon: <FaGlobe /> },
    { path: '/keuzehulp', label: 'Keuzehulp', icon: <FaCompass /> },
    { path: '/reis-check', label: 'Reis Check', icon: <FaClipboardCheck /> },
    { path: '/mijn-favorieten', label: 'Mijn Favorieten', icon: <FaHeart /> },
  ];
  
  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <motion.h2
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')}
      >
        VakantieWijzer
      </motion.h2>

      <ul>
        {navItems.map((item) => (
          <motion.li 
            key={item.path}
            whileHover={{ y: -2 }}
          >
            <NavLink to={item.path}>
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </motion.li>
        ))}
        
        <motion.li 
          className="account-dropdown"
          ref={dropdownRef}
        >
          <motion.button
            className="account-button"
            onClick={() => setDropdownVisible(!dropdownVisible)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoggedIn ? <FaUserCheck className="user-icon" /> : <FaUserCircle className="user-icon" />}
            <span>Mijn Account</span>
          </motion.button>

          <AnimatePresence>
            {dropdownVisible && (
              <motion.div 
                className="dropdown-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {isLoggedIn ? (
                  <>
                    <motion.div whileHover={{ x: 5 }}>
                      <NavLink to="/account">Accountoverzicht</NavLink>
                    </motion.div>
                    <motion.button 
                      onClick={handleLogout}
                      whileHover={{ x: 5 }}
                    >
                      Uitloggen
                    </motion.button>
                  </>
                ) : (
                  <motion.div whileHover={{ x: 5 }}>
                    <NavLink to="/mijn-account">Inloggen</NavLink>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.li>
      </ul>
    </motion.nav>
  );
};

export default Navbar;
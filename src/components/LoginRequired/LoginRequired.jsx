import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LoginRequired.css';

const LoginRequired = () => {
  return (
    <motion.div 
      className="login-required-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="login-required-content">
        <h1>🔐 Login Vereist</h1>
        <p>Je moet ingelogd zijn om deze pagina te bekijken.</p>
        
        <div className="login-required-actions">
          <Link to="/mijn-account" className="login-button">
            Inloggen
          </Link>
          <Link to="/" className="home-button1">
            Terug naar Home
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginRequired;
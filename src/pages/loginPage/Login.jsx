import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import Popup from '../../components/Popup/Popup';
import FormGroup from '../../components/FormGroup/FormGroup';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage('Vul zowel een gebruikersnaam als een wachtwoord in.');
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 5000);
      return;
    }

    try {
      const response = await fetch('https://api.datavortex.nl/vakantiewijzer/users/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': 'vakantiewijzer:7FZmMmmYlzUoPdSkAtzG'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.jwt) {
        login(data.jwt);
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
          navigate('/');
        }, 1000);
      } else {
        setErrorMessage(data.message || 'Inloggen mislukt');
        setShowErrorPopup(true);
        setTimeout(() => setShowErrorPopup(false), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Er is een fout opgetreden');
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 5000);
    }
  };

    return (
      <motion.div 
        className="login-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-container">
          {showSuccessPopup && <Popup type="success" message="Inloggen succesvol!" />}
          {showErrorPopup && <Popup type="error" message={errorMessage} />}
          
          <motion.div 
            className="login-header"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Welkom terug!</h2>
            <p>Log in om je reis voorkeuren op te slaan</p>
          </motion.div>
  
          <form onSubmit={handleSubmit}>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FormGroup 
                label="Gebruikersnaam" 
                icon={<FaUser />}
              >
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Voer je gebruikersnaam in"
                  required
                />
              </FormGroup>
            </motion.div>
  
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <FormGroup 
                label="Wachtwoord" 
                icon={<FaLock />}
              >
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Voer je wachtwoord in"
                  required
                />
              </FormGroup>
            </motion.div>
  
            <motion.button
              type="submit"
              className="login-button"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Inloggen
            </motion.button>
          </form>
  
          <motion.p 
            className="register-link"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Nog geen account?
            <Link to="/registreren">Registreer hier</Link>
          </motion.p>
        </div>
      </motion.div>
    );
  };
  
  export default Login;
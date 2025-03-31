import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Popup from '../../components/Popup/Popup';
import FormGroup from '../../components/FormGroup/FormGroup';
import TermsAndConditions from '../../components/TermsAndConditions/TermsAndConditions';
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength';
import './SignUp.css';

const API_URL = 'https://frontend-educational-backend.herokuapp.com/api';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    if (!termsAccepted) {
      return 'Je moet akkoord gaan met de algemene voorwaarden.';
    }
    if (username.length < 6) {
      return 'Gebruikersnaam moet minimaal 6 tekens bevatten.';
    }
    if (password.length < 8) {
      return 'Wachtwoord moet minimaal 8 tekens bevatten.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Wachtwoord moet minimaal één hoofdletter bevatten.';
    }
    if (!/[0-9]/.test(password)) {
      return 'Wachtwoord moet minimaal één cijfer bevatten.';
    }
    if (password !== confirmPassword) {
      return 'Wachtwoorden komen niet overeen.';
    }
    if (!email.includes('@')) {
      return 'Vul een geldig e-mailadres in.';
    }
    return null;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 5000);
      return;
    }

    try {
      // Test eerst of de API bereikbaar is
      await axios.get(`${API_URL}/test/all`);
      
      // Registreer de nieuwe gebruiker
      const signupResponse = await axios.post(`${API_URL}/auth/signup`, {
        username,
        email,
        password,
        role: ["user"],
        info: `${firstName} ${lastName}`
      });

      if (signupResponse.status === 200) {
        // Login direct na registratie
        const loginResponse = await axios.post(`${API_URL}/auth/signin`, {
          username,
          password
        });

        if (loginResponse.data.accessToken) {
          login(loginResponse.data.accessToken);
          setShowSuccessPopup(true);
          setTimeout(() => {
            setShowSuccessPopup(false);
            navigate('/mijn-account');
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMsg = error.response?.data?.message || 
        'Er is een fout opgetreden. Controleer of je gegevens correct zijn en probeer het opnieuw.';
      setErrorMessage(errorMsg);
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 5000);
    }
  };
  
  return (
    <motion.div 
      className="signup-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="signup-container">
        {showSuccessPopup && <Popup type="success" message="Registratie succesvol!" />}
        {showErrorPopup && <Popup type="error" message={errorMessage} />}
        
        <motion.div 
          className="signup-header"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Account Aanmaken</h2>
          <p>Maak een account aan en plan jouw perfecte reis!</p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <FormGroup 
                label="Voornaam" 
                icon={<FaUserCircle />}
              >
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Voer je voornaam in"
                  required
                />
              </FormGroup>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FormGroup 
                label="Achternaam" 
                icon={<FaUserCircle />}
              >
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Voer je achternaam in"
                  required
                />
              </FormGroup>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <FormGroup 
              label="E-mailadres" 
              icon={<FaEnvelope />}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Voer je e-mailadres in"
                required
              />
            </FormGroup>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FormGroup 
              label="Gebruikersnaam" 
              icon={<FaUser />}
            >
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Kies een gebruikersnaam"
                required
              />
            </FormGroup>
          </motion.div>

          <div className="form-grid">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
          <FormGroup 
            label="Wachtwoord" 
            icon={<FaLock />}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Kies een wachtwoord"
              required
            />
            <PasswordStrength password={password} />
            <small className="password-requirements">
              Wachtwoord moet minimaal 8 tekens bevatten, waarvan 1 hoofdletter en 1 cijfer
            </small>
          </FormGroup>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <FormGroup 
                label="Bevestig Wachtwoord" 
                icon={<FaLock />}
              >
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Bevestig je wachtwoord"
                  required
                />
              </FormGroup>
            </motion.div>

          </div>
          <motion.div
            className="terms-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <TermsAndConditions 
              accepted={termsAccepted}
              onAcceptChange={setTermsAccepted}
            />
          </motion.div>

          <motion.button
            type="submit"
            className="signup-button"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Account Aanmaken
          </motion.button>

          <motion.p 
            className="login-link"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Al een account? <Link to="/mijn-account">Log hier in</Link>
          </motion.p>
        </form>
      </div>
    </motion.div>
  );
};

export default SignUp;
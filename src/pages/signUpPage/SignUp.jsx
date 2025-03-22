import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaUserCircle } from 'react-icons/fa';
import Popup from '../../components/Popup/Popup';
import FormGroup from '../../components/FormGroup/FormGroup';
import TermsAndConditions from '../../components/TermsAndConditions/TermsAndConditions';
import './SignUp.css';

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

  const validateForm = () => {
    if (!termsAccepted) {
      return 'Je moet akkoord gaan met de algemene voorwaarden.';
    }
    if (username.length < 4) {
      return 'Gebruikersnaam moet minimaal 4 letters bevatten.';
    }
    if (password.length < 8) {
      return 'Wachtwoord moet minimaal 8 letters bevatten.';
    }
    if (password !== confirmPassword) {
      return 'Wachtwoorden komen niet overeen.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      setShowErrorPopup(true);
      // Gebruik een iets langere timeout voor error messages
      setTimeout(() => setShowErrorPopup(false), 5000);
      return;
    }

    const user = {
      firstName,
      lastName,
      email,
      username,
      password,
      termsAccepted
    };

    try {
      const response = await fetch('https://api.datavortex.nl/vakantiewijzer/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': 'vakantiewijzer:7FZmMmmYlzUoPdSkAtzG'
        },
        body: JSON.stringify(user)
      });

      const textResponse = await response.text();
      console.log('Server Response:', textResponse);

      if (response.ok) {
        setShowSuccessPopup(true);
        // Gebruik een kortere timeout voor een success messages
        setTimeout(() => {
          setShowSuccessPopup(false);
          navigate('/mijn-account');
        }, 2000);
      } else {
        setErrorMessage(`Registratie mislukt: ${textResponse}`);
        setShowErrorPopup(true);
        setTimeout(() => setShowErrorPopup(false), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Er is een fout opgetreden. Probeer het opnieuw.');
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
          <p>Maak een account aan om je voorkeuren op te slaan</p>
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
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaEdit, FaSave } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Popup from '../../components/Popup/Popup';
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength';
import './Account.css';

const API_URL = 'https://frontend-educational-backend.herokuapp.com/api';

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { user, checkAuthStatus } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUserData(response.data);
        setEmail(response.data.email);
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
        setErrorMessage('Fout bij het ophalen van gebruikersgegevens');
        setShowErrorPopup(true);
        setTimeout(() => setShowErrorPopup(false), 4000);
      }
    };

    fetchUserData();
  }, [navigate]);

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Wachtwoord moet minimaal 8 tekens bevatten';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Wachtwoord moet minimaal één hoofdletter bevatten';
    }
    if (!/[0-9]/.test(password)) {
      return 'Wachtwoord moet minimaal één cijfer bevatten';
    }
    return null;
  };
  
  const handleSaveChanges = async () => {
    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrorMessage(passwordError);
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 4000);
      return;
    }
  
    if (password !== repeatedPassword) {
      setErrorMessage('Wachtwoorden komen niet overeen');
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 4000);
      return;
    }
  

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axios.put(`${API_URL}/user`, 
        { password, repeatedPassword },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 2000);
      setIsEditingPassword(false);
      setPassword('');
      setRepeatedPassword('');
      checkAuthStatus();
    } catch (error) {
      console.error('Error updating password:', error);
      setErrorMessage(error.response?.data?.message || 'Fout bij het wijzigen van het wachtwoord');
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 4000);
    }
  };

  if (!userData) {
    return (
      <div className="loading-container">
        <p>Gegevens laden...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="account-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="account-container">
        {showSuccessPopup && <Popup type="success" message="Wijzigingen succesvol opgeslagen!" />}
        {showErrorPopup && <Popup type="error" message={errorMessage} />}
        
        <motion.div 
          className="account-header"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Mijn Account</h2>
          <p className="account-subtitle">Beheer je persoonlijke gegevens</p>
        </motion.div>

        <div className="account-content">
          <motion.div 
            className="account-section"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="form-group">
              <div className="input-icon-wrapper">
                <FaUser className="input-icon" />
                <label>Gebruikersnaam</label>
              </div>
              <p className="user-info">{username}</p>
            </div>
          </motion.div>

          <motion.div 
            className="account-section"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="form-group">
              <div className="input-icon-wrapper">
                <FaEnvelope className="input-icon" />
                <label>E-mailadres</label>
              </div>
              <p className="user-info">{email}</p>
            </div>
          </motion.div>

          <motion.div 
            className="account-section"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="form-group">
              <div className="input-icon-wrapper">
                <FaLock className="input-icon" />
                <label>Wachtwoord</label>
              </div>
              {isEditingPassword ? (
                <div className="password-edit">
                  <div className="password-inputs">
                    <input 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Nieuw wachtwoord"
                    />
                    <PasswordStrength password={password} />
                    <small className="password-requirements">
                      Wachtwoord moet minimaal 8 tekens bevatten, waarvan 1 hoofdletter en 1 cijfer
                    </small>
                    <input 
                      type="password" 
                      value={repeatedPassword} 
                      onChange={(e) => setRepeatedPassword(e.target.value)}
                      placeholder="Herhaal wachtwoord"
                    />
                  </div>
                  <button onClick={handleSaveChanges} className="save-button">
                    <FaSave /> Opslaan
                  </button>
                </div>
              ) : (
                <div className="password-display">
                  <p className="user-info">********</p>
                  <button onClick={() => setIsEditingPassword(true)} className="edit-button">
                    <FaEdit /> Wijzigen
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Account
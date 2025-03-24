import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaEdit, FaSave } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import Popup from '../../components/Popup/Popup';
import './Account.css';

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { user, checkAuthStatus } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token || !user) {
        navigate('/mijn-account');
        return;
      }

      try {
        const response = await fetch(`https://api.datavortex.nl/vakantiewijzer/users/${user.sub}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setEmail(data.email);
          setUsername(data.username); 
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/mijn-account');
      }
    };

    fetchUserData();
  }, [user, navigate]);

  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');
    if (!token || !user) {
      navigate('/mijn-account');
      return;
    }

    try {
      const response = await fetch(`https://api.datavortex.nl/vakantiewijzer/users/${user.sub}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 1000);
        setIsEditingPassword(false);
        checkAuthStatus();
      } else {
        throw new Error('Failed to update user data');
      }
    } catch (error) {
      setErrorMessage('Er is een fout opgetreden bij het opslaan van de wijzigingen');
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 4000);
    }
  };

  if (!userData) {
    return <p>Loading...</p>;
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
                    <input 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Nieuw wachtwoord"
                    />
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
  
  export default Account;
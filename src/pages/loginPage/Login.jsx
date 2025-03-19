import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage('Vul zowel een gebruikersnaam als een wachtwoord in.');
      setShowErrorPopup(true);
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 5000);
      return;
    }

    const user = {
      username,
      password
    };

    try {
      const response = await fetch('https://api.datavortex.nl/vakantiewijzer/users/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': 'vakantiewijzer:7FZmMmmYlzUoPdSkAtzG'
        },
        body: JSON.stringify(user)
      });

      const data = await response.json();
      console.log('Server Response:', data); // Log de server response

      if (response.ok) {
        if (data.jwt) {
          localStorage.setItem('token', data.jwt);
          setShowSuccessPopup(true);
          setTimeout(() => {
            setShowSuccessPopup(false);
            navigate('/');
          }, 1000); // Hide popup and redirect after 5 seconds
        } else {
          setErrorMessage('Inloggen mislukt: Geen token ontvangen');
          setShowErrorPopup(true);
          setTimeout(() => {
            setShowErrorPopup(false);
          }, 4000);
        }
      } else {
        setErrorMessage(`Inloggen mislukt: ${data.message || 'Onbekende fout'}`);
        setShowErrorPopup(true);
        setTimeout(() => {
          setShowErrorPopup(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Er is een fout opgetreden. Probeer het opnieuw.');
      setShowErrorPopup(true);
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 5000);
    }
  };

  return (
    <div className="login-container">
      {showSuccessPopup && <Popup type="success" message="Inloggen succesvol!" />}
      {showErrorPopup && <Popup type="error" message={errorMessage} />}
      <h2>Inloggen</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup label="Gebruikersnaam:">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup label="Wachtwoord:">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <button type="submit" className="login-button">Inloggen</button>
      </form>
      <p>Nog geen account? <Link to="/registreren">Registreer hier</Link></p>
    </div>
  );
};

export default Login;
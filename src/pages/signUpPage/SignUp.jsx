import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../../components/Popup/Popup';
import FormGroup from '../../components/FormGroup/FormGroup';
import './SignUp.css';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length < 4) {
      setErrorMessage('Gebruikersnaam moet minimaal 4 letters bevatten.');
      setShowErrorPopup(true);
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 4000);
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Wachtwoord moet minimaal 8 letters bevatten.');
      setShowErrorPopup(true);
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 4000);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Wachtwoorden komen niet overeen.');
      setShowErrorPopup(true);
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 4000);
      return;
    }

    const user = {
      firstName,
      lastName,
      email,
      username,
      password,
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
        const data = JSON.parse(textResponse);
        setShowSuccessPopup(true);
        
        setTimeout(() => {
          setShowSuccessPopup(false);
          navigate('/mijn-account');
        }, 1000);
      } else {
        setErrorMessage(`Registratie mislukt: ${textResponse}`);
        setShowErrorPopup(true);
        setTimeout(() => {
          setShowErrorPopup(false);
        }, 4000);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Er is een fout opgetreden. Probeer het opnieuw.');
      setShowErrorPopup(true);
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 4000);
    }
  };

  return (
    <div className="signup-container">
      {showSuccessPopup && <Popup type="success" message="Registratie succesvol!" />}
      {showErrorPopup && <Popup type="error" message={errorMessage} />}
      <h2>Registreren</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup label="Voornaam:">
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup label="Achternaam:">
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup label="E-mailadres:">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
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
        <FormGroup label="Bevestig Wachtwoord:">
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </FormGroup>
        <button type="submit" className="signup-button">Registreren</button>
      </form>
    </div>
  );
};

export default SignUp;
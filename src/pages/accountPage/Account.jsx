import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Popup from '../../components/Popup/Popup';
import FormGroup from '../../components/FormGroup/FormGroup';
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

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/mijn-account');
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub;
        console.log('Decoded username:', username);

        if (!username) {
          console.error('Geen geldige gebruikersnaam gevonden in token.');
          navigate('/mijn-account');
          return;
        }

        const response = await fetch(`https://api.datavortex.nl/vakantiewijzer/users/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const text = await response.text();
        console.log('API raw response:', response.status, text);

        if (response.ok) {
          const data = JSON.parse(text);
          setUserData(data);
          setEmail(data.email);
          setUsername(data.username);
        } else {
          console.error('API error:', text);
          navigate('/mijn-account');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/mijn-account');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/mijn-account');
      return;
    }

    const body = { password };

    try {
      const response = await fetch(`https://api.datavortex.nl/vakantiewijzer/users/${userData.username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      const text = await response.text();
      console.log('API raw response:', response.status, text);

      if (response.ok) {
        const data = text ? JSON.parse(text) : {};
        setUserData(data);
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 1000);
        setIsEditingPassword(false);
      } else {
        setErrorMessage('Er is een fout opgetreden bij het opslaan van de wijzigingen. Probeer het later opnieuw.');
        setShowErrorPopup(true);
        setTimeout(() => {
          setShowErrorPopup(false);
        }, 4000);
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      setErrorMessage('Er is een fout opgetreden bij het opslaan van de wijzigingen. Probeer het later opnieuw.');
      setShowErrorPopup(true);
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 4000);
    }
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="account-container">
      {showSuccessPopup && <Popup type="success" message="Wijzigingen succesvol opgeslagen!" />}
      {showErrorPopup && <Popup type="error" message={errorMessage} />}
      <h2>Mijn Account</h2>
      <FormGroup label="Gebruikersnaam:">
        <p>{username}</p>
      </FormGroup>
      <FormGroup label="E-mailadres:">
        <p>{email}</p>
      </FormGroup>
      <FormGroup label="Wachtwoord:">
        {isEditingPassword ? (
          <>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSaveChanges}>Opslaan</button>
          </>
        ) : (
          <>
            <p>********</p>
            <button onClick={() => setIsEditingPassword(true)}>Wachtwoord wijzigen</button>
          </>
        )}
      </FormGroup>
    </div>
  );
};

export default Account;
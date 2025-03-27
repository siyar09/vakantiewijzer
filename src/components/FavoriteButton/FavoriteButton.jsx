import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { motion } from 'framer-motion';
import Popup from '../Popup/Popup';
import './FavoriteButton.css';

const FavoriteButton = ({ city }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [username, setUsername] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('success');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const username = decodedToken.sub;
      setUsername(username);

      const favorites = JSON.parse(localStorage.getItem(`favorites_${username}`)) || [];
      setIsFavorite(favorites.some(fav => fav.city === city.city && fav.country === city.country));
    }
  }, [city]);

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem(`favorites_${username}`)) || [];
    if (isFavorite) {
      const newFavorites = favorites.filter(fav => fav.city !== city.city || fav.country !== city.country);
      localStorage.setItem(`favorites_${username}`, JSON.stringify(newFavorites));
      setIsFavorite(false);
      setPopupMessage('Verwijderd uit favorieten');
      setPopupType('error'); // Rood voor verwijderen
    } else {
      favorites.push(city);
      localStorage.setItem(`favorites_${username}`, JSON.stringify(favorites));
      setIsFavorite(true);
      setPopupMessage('Toegevoegd aan favorieten');
      setPopupType('success'); // Groen voor toevoegen
    }
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <>
      <motion.button 
        className={`favorite-button ${isFavorite ? 'favorite' : ''}`} 
        onClick={handleFavoriteClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isFavorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
      >
        {isFavorite ? '❤️' : '♡'}
      </motion.button>
      {showPopup && (
        <Popup 
          type={popupType}
          message={popupMessage}
        />
      )}
    </>
  );
};

export default FavoriteButton;
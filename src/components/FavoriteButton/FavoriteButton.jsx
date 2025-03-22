import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { motion, AnimatePresence } from 'framer-motion';
import './FavoriteButton.css';

const FavoriteButton = ({ city }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [username, setUsername] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

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
    } else {
      favorites.push(city);
      localStorage.setItem(`favorites_${username}`, JSON.stringify(favorites));
      setIsFavorite(true);
      setPopupMessage('Toegevoegd aan favorieten');
    }
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Verbergt de popup na 3 seconden
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
      <AnimatePresence mode="wait">
        {showPopup && (
          <motion.div 
            className="favorite-popup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {popupMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FavoriteButton;
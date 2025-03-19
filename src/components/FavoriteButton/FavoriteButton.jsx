import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
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
    }, 3000); // Verberg de popup na 3 seconden
  };

  return (
    <>
      <button className={`favorite-button ${isFavorite ? 'favorite' : ''}`} onClick={handleFavoriteClick}>
        {isFavorite ? '❤️' : '♡'}
      </button>
      {showPopup && (
        <div className="favorite-popup">
          {popupMessage}
        </div>
      )}
    </>
  );
};

export default FavoriteButton;
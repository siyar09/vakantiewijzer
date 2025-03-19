import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import CityCard from '../../components/CityCard/CityCard';
import './MijnFavorieten.css';

const MijnFavorieten = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const username = decodedToken.sub;
      const savedFavorites = JSON.parse(localStorage.getItem(`favorites_${username}`)) || [];
      setFavorites(savedFavorites);
    }
  }, []);

  const handleFavoriteClick = (city) => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const username = decodedToken.sub;
      const favorites = JSON.parse(localStorage.getItem(`favorites_${username}`)) || [];
      const newFavorites = favorites.filter(fav => fav.city !== city.city || fav.country !== city.country);
      localStorage.setItem(`favorites_${username}`, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    }
  };

  const handleAddFavoriteClick = () => {
    navigate('/bestemmingen');
  };

  return (
    <div className="favorites-container">
      <h1>Mijn Favorieten</h1>
        <div className='favorite-text'>
            <p>Hier vind je al jouw opgeslagen vakantiebestemmingen. Klik op een bestemming om meer details te bekijken of verwijder deze uit je favorieten.</p>
        </div>
      {favorites.length === 0 ? (
        <p>Je hebt nog geen favoriete bestemmingen.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((fav, index) => (
            <CityCard 
              key={index} 
              city={fav} 
              showDetails={false} 
              showDescriptionOnly={true} 
              handleFavoriteClick={() => handleFavoriteClick(fav)} 
            />
          ))}
        </div>
      )}
      <div className="add-favorite" onClick={handleAddFavoriteClick}>
        <p>Voeg een nieuwe favoriet toe!</p>
        <div className="add-icon">+</div>
      </div>
    </div>
  );
};

export default MijnFavorieten;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaPlus, FaMapMarkedAlt } from 'react-icons/fa';
import CityCard from '../../components/CityCard/CityCard';
import './MijnFavorieten.css';

const MijnFavorieten = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFavorites = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          const username = decodedToken.sub;
          const savedFavorites = JSON.parse(localStorage.getItem(`favorites_${username}`)) || [];
          setFavorites(savedFavorites);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleFavoriteClick = (city) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub;
        const newFavorites = favorites.filter(
          fav => fav.city !== city.city || fav.country !== city.country
        );
        localStorage.setItem(`favorites_${username}`, JSON.stringify(newFavorites));
        setFavorites(newFavorites);
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleAddFavoriteClick = () => {
    window.scrollTo(0, 0);
    navigate('/bestemmingen');
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Favorieten laden...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="favorites-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="favorites-header"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1><FaHeart className="header-icon" /> Mijn Favorieten</h1>
        <p className="favorite-text">
          Hier vind je al jouw opgeslagen vakantiebestemmingen. Klik op een bestemming 
          om meer details te bekijken of verwijder deze uit je favorieten.
        </p>
      </motion.div>

      <AnimatePresence>
        {favorites.length === 0 ? (
          <motion.div 
            className="no-favorites"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaMapMarkedAlt className="empty-icon" />
            <p>Je hebt nog geen favoriete bestemmingen.</p>
          </motion.div>
        ) : (
          <motion.div 
            className="favorites-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {favorites.map((fav, index) => (
              <motion.div
                key={`${fav.city}-${fav.country}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CityCard 
                  city={fav}
                  showDetails={false}
                  showDescriptionOnly={true}
                  handleFavoriteClick={() => handleFavoriteClick(fav)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="add-favorite"
        onClick={handleAddFavoriteClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaPlus className="add-icon" />
        <p>Voeg een nieuwe favoriet toe!</p>
      </motion.div>
    </motion.div>
  );
};

export default MijnFavorieten;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import countries from '../../data/Countries';
import './SearchBar.css';

const SearchBar = ({ searchTerm, handleSearch }) => {
  const [translatedTerm, setTranslatedTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (event) => {
    const input = event.target.value;
    handleSearch(input);

    if (input.length > 1) {
      const matches = countries.filter(country => 
        country.city.toLowerCase().includes(input.toLowerCase()) ||
        country.countryNL.toLowerCase().includes(input.toLowerCase())
      ).slice(0, 5);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    const foundCountry = countries.find(
      (country) => country.city.toLowerCase() === input.toLowerCase() || 
                   country.countryNL.toLowerCase() === input.toLowerCase()
    );
    setTranslatedTerm(foundCountry ? foundCountry.city : input);
  };

  const clearSearch = () => {
    handleSearch('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSearch(suggestion.city);
    setTranslatedTerm(suggestion.city);
    setShowSuggestions(false);
  };

  return (
    <motion.div 
      className='search-container'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="search-input-wrapper">
        <FaSearch className="search-icon" />
        <input
          type='text'
          placeholder='Typ een land of stad in...'
          value={searchTerm}
          onChange={handleInputChange}
          className='search-input'
          onFocus={() => setShowSuggestions(true)}
        />
        {searchTerm && (
          <motion.button
            className="clear-button"
            onClick={clearSearch}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTimes />
          </motion.button>
        )}
      </div>

      <motion.button 
        className='search-button'
        onClick={() => handleSearch(translatedTerm)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Zoeken
      </motion.button>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            className="suggestions-container"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.city}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ backgroundColor: '#f0f0f0' }}
              >
                <span className="suggestion-city">{suggestion.city}</span>
                <span className="suggestion-country">{suggestion.countryNL}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchBar;
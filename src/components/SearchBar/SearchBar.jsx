import React, { useState } from 'react';
import countries from '../../data/Countries';
import './SearchBar.css';

const SearchBar = ({ searchTerm, handleSearch }) => {
  const [translatedTerm, setTranslatedTerm] = useState('');

  const handleInputChange = (event) => {
    const input = event.target.value;
    const foundCountry = countries.find(
      (country) => country.city.toLowerCase() === input.toLowerCase() || country.countryNL.toLowerCase() === input.toLowerCase()
    );
    const translatedCity = foundCountry ? foundCountry.city : input;
    setTranslatedTerm(translatedCity);
    handleSearch(translatedCity);
  };

  return (
    <div className='search-container'>
      <input
        type='text'
        placeholder='Typ een land of stad in...'
        value={searchTerm}
        onChange={handleInputChange}
        className='search-input'
      />
      <button className='search-button' onClick={() => handleSearch(translatedTerm)}>Zoeken</button>
    </div>
  );
};

export default SearchBar;
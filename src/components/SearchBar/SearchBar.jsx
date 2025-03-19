import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div className='search-container'>
      <input
        type='text'
        placeholder='Typ een land of stad in...'
        value={searchTerm}
        onChange={handleSearch}
        className='search-input'
      />
      <button className='search-button'>Zoeken</button>
    </div>
  );
};

export default SearchBar;
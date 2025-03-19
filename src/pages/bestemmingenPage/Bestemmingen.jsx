import React from 'react';
import CityList from '../../components/CityList/CityList';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterBar from '../../components/FilterBar/FilterBar';
import useCityData from '../../hooks/useCityData';

import './Bestemmingen.css';

const Bestemmingen = () => {
  const { cityData, filteredCityData, error, searchTerm, handleSearch, handleFilterChange, handleSortChange, handleResetFilters } = useCityData();

  return (
    <div className='page-container'>
      <div className='content-wrap'>
        <h1>📌 Zoek jouw ideale vakantiebestemming</h1>
        <p className='subheading'>
          Wil je een specifieke vakantiebestemming bekijken? Gebruik de zoekbalk hieronder om snel informatie te vinden over jouw favoriete locaties. Je kunt zoeken op land of stad!
        </p>
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <FilterBar handleFilterChange={handleFilterChange} handleSortChange={handleSortChange} handleResetFilters={handleResetFilters} />
        {error && <p>{error}</p>}
        <CityList cityData={filteredCityData} showDetails={true} showDescriptionOnly={false} />
      </div>
    </div>
  );
};

export default Bestemmingen;
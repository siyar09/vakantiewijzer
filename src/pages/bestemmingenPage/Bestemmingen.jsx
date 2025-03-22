import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkedAlt } from 'react-icons/fa';
import CityList from '../../components/CityList/CityList';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterBar from '../../components/FilterBar/FilterBar';
import useCityData from '../../hooks/useCityData';
import './Bestemmingen.css';

const Bestemmingen = () => {
  const { 
    cityData, 
    filteredCityData, 
    error, 
    searchTerm, 
    handleSearch, 
    handleFilterChange, 
    handleSortChange, 
    handleResetFilters 
  } = useCityData();

  return (
    <motion.div 
      className='page-container'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className='content-wrap'>
        <motion.div 
          className="header-section"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1><FaMapMarkedAlt className="header-icon" /> Zoek jouw ideale vakantiebestemming</h1>
          <p className='subheading'>
            Wil je een specifieke vakantiebestemming bekijken? Gebruik de zoekbalk hieronder om snel informatie te vinden over jouw favoriete locaties. Je kunt zoeken op land of stad!
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <FilterBar 
            handleFilterChange={handleFilterChange} 
            handleSortChange={handleSortChange} 
            handleResetFilters={handleResetFilters} 
          />
        </motion.div>

        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CityList 
            cityData={filteredCityData} 
            showDetails={true} 
            showDescriptionOnly={false} 
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Bestemmingen;
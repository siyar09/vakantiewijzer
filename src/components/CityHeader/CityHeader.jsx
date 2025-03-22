import React from 'react';
import { motion } from 'framer-motion';
import countries from '../../data/Countries';
import './CityHeader.css';

const CityHeader = ({ city, country }) => {
  const getCountryCode = () => {
    const cityData = countries.find(c => c.city === city && c.country === country);
    return cityData?.countryCode.toLowerCase() || 'unknown';
  };

  const flagUrl = `https://flagcdn.com/w80/${getCountryCode()}.png`;

  return (
    <motion.div 
      className='city-header'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Meer informatie over: {city}, {country}
        {flagUrl && (
          <motion.img 
            src={flagUrl} 
            alt={`Vlag van ${country}`} 
            className='country-flag'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}
      </motion.h1>
    </motion.div>
  );
};

export default CityHeader;
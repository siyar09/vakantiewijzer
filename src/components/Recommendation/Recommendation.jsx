import React from 'react';
import { motion } from 'framer-motion';
import CityList from '../CityList/CityList';
import './Recommendation.css';

const Recommendation = ({ recommendations }) => {
  return (
    <motion.div 
      className="recommendation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Op basis van je antwoorden raden we de volgende bestemmingen aan:
      </motion.h3>
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <CityList 
          cityData={recommendations} 
          showDetails={false} 
          showDescriptionOnly={false} 
        />
      </motion.div>
    </motion.div>
  );
};

export default Recommendation;
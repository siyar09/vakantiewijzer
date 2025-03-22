import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter, FaSort, FaEuroSign, FaSun, FaUndo } from 'react-icons/fa';
import { TRAVEL_TIMES } from '../BestTravelTime/BestTravelTime';
import './FilterBar.css';

const FilterBar = ({ handleFilterChange, handleSortChange, handleResetFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleFilters = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div 
      className="filter-bar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button 
        onClick={toggleFilters} 
        className="filter-toggle-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaFilter className="button-icon" />
        {isExpanded ? 'Verberg Filters' : 'Toon Filters'}
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="filter-options"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="filter-group">
              <FaSun className="filter-icon" />
              <label>
                Beste reisperiode:
                <select onChange={(e) => handleFilterChange('bestTime', e.target.value)}>
                  <option value="">Alle seizoenen</option>
                  <option value={TRAVEL_TIMES.SUMMER}>{TRAVEL_TIMES.SUMMER}</option>
                  <option value={TRAVEL_TIMES.SPRING_FALL}>{TRAVEL_TIMES.SPRING_FALL}</option>
                  <option value={TRAVEL_TIMES.FALL_SUMMER}>{TRAVEL_TIMES.FALL_SUMMER}</option>
                </select>
              </label>
            </div>

            <div className="filter-group">
              <FaEuroSign className="filter-icon" />
              <label>
                Budget:
                <select onChange={(e) => handleFilterChange('budget', e.target.value)}>
                  <option value="">Alle prijsklassen</option>
                  <option value="goedkoop">Goedkoop</option>
                  <option value="gemiddeld">Gemiddeld</option>
                  <option value="duur">Duur</option>
                </select>
              </label>
            </div>

            <div className="filter-group">
              <FaSort className="filter-icon" />
              <label>
                Sorteer op:
                <select onChange={(e) => handleSortChange(e.target.value)}>
                  <option value="none">Geen sortering</option>
                  <option value="alphabetical">Alfabetisch</option>
                </select>
              </label>
            </div>

            <motion.button 
              onClick={handleResetFilters} 
              className="reset-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUndo className="button-icon" />
              Reset Filters
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterBar;
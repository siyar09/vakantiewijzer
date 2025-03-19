import React, { useState } from 'react';
import { TRAVEL_TIMES } from '../BestTravelTime/BestTravelTime';
import './FilterBar.css';

const FilterBar = ({ handleFilterChange, handleSortChange, handleResetFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleFilters = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="filter-bar">
      <button onClick={toggleFilters} className="filter-toggle-button">
        {isExpanded ? 'Verberg Filters' : 'Toon Filters'}
      </button>
      {isExpanded && (
        <div className="filter-options">
          <label>
            Beste reisperiode:
            <select onChange={(e) => handleFilterChange('bestTime', e.target.value)}>
              <option value="">Alle</option>
              <option value={TRAVEL_TIMES.SUMMER}>{TRAVEL_TIMES.SUMMER}</option>
              <option value={TRAVEL_TIMES.SPRING_FALL}>{TRAVEL_TIMES.SPRING_FALL}</option>
              <option value={TRAVEL_TIMES.FALL_SUMMER}>{TRAVEL_TIMES.FALL_SUMMER}</option>
            </select>
          </label>
          <label>
            Budget:
            <select onChange={(e) => handleFilterChange('budget', e.target.value)}>
              <option value="">Alle</option>
              <option value="goedkoop">Goedkoop</option>
              <option value="gemiddeld">Gemiddeld</option>
              <option value="duur">Duur</option>
            </select>
          </label>
          <label>
            Sorteer op:
            <select onChange={(e) => handleSortChange(e.target.value)}>
              <option value="none">Geen</option>
              <option value="alphabetical">Alfabetisch</option>
            </select>
          </label>
          <button onClick={handleResetFilters} className="reset-button">Reset Filters</button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
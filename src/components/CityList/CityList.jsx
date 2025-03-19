import React from 'react';
import './CityList.css';
import CityCard from '../CityCard/CityCard';

const CityList = ({ cityData, showDetails, showDescriptionOnly }) => (
  <ul className='city-list'>
    {cityData.length > 0 ? (
      cityData.map((city, index) => (
        <li key={index} className='city-item'>
          <CityCard city={city} showDetails={showDetails} showDescriptionOnly={showDescriptionOnly} />
        </li>
      ))
    ) : (
      <p>Geen data beschikbaar of de data wordt nog geladen...</p>
    )}
  </ul>
);

export default CityList;
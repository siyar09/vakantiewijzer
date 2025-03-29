import React from 'react';
import './CityList.css';
import CityCard from '../CityCard/CityCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const CityList = ({ cityData, showDetails, showDescriptionOnly }) => (
  <ul className='city-list'>
    {cityData.length > 0 ? (
      cityData.map((city, index) => (
        <li key={index} className='city-item'>
          <CityCard city={city} showDetails={showDetails} showDescriptionOnly={showDescriptionOnly} />
        </li>
      ))
    ) : (
      <LoadingSpinner />
    )}
  </ul>
);

export default CityList;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CityWeather from '../CityWeather/CityWeather';
import CityImage from '../CityImage/CityImage';
import BudgetCategory from '../BudgetCategory/BudgetCategory';
import BestTravelTime from '../BestTravelTime/BestTravelTime';
import descriptions from '../../data/descriptions.json';
import './CityCard.css';

const CityCard = ({ city, showDetails, showDescriptionOnly }) => {
  const navigate = useNavigate();

  const handleMoreInfoClick = () => {
    navigate(`/city/${city.city}`, { state: { city } });
  };

  const defaultDescription = descriptions[city.city] || "Geen beschrijving beschikbaar voor deze bestemming.";

  return (
    <div className='city-card'>
      <CityImage city={city.city} className="city-image"/>
      <div className='city-info'>
        <h2>📍{city.city}, {city.country}</h2>
        <p className='city-description'>{city.description || defaultDescription}</p>
        {!showDescriptionOnly && showDetails && (
          <>
            <BudgetCategory budget={city.budget} />
            <BestTravelTime bestTravelTime={city.bestTravelTime} />
            <CityWeather city={city.city} />
          </>
        )}
        <button className='more-info-button' onClick={handleMoreInfoClick}>Meer informatie</button>
      </div>
    </div>
  );
};

export default CityCard;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CityWeather from '../CityWeather/CityWeather';
import CityImage from '../CityImage/CityImage';
import BudgetCategory from '../BudgetCategory/BudgetCategory';
import BestTravelTime from '../BestTravelTime/BestTravelTime';
import descriptions from '../../data/descriptions.json';
import './CityCard.css';

const WEATHER_API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;

const CityCard = ({ city, showDetails, showDescriptionOnly }) => {
  const navigate = useNavigate();
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.city}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const data = await response.json();
        if (data?.main?.temp) {
          setTemperature(Math.round(data.main.temp));
        }
      } catch (error) {
        console.error('Error fetching temperature:', error);
      }
    };

    fetchTemperature();
  }, [city.city]);

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
            <BestTravelTime temperature={temperature} />
            <CityWeather city={city.city} />
          </>
        )}
        <button className='more-info-button' onClick={handleMoreInfoClick}>Meer informatie</button>
      </div>
    </div>
  );
};

export default CityCard;
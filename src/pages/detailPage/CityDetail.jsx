import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CityHeader from '../../components/CityHeader/CityHeader';
import CityInfo from '../../components/CityInfo/CityInfo';
import CityActivities from '../../components/CityActivities/CityActivities';
import CityFood from '../../components/CityFood/CityFood';
import CityMap from '../../components/CityMap/CityMap';
import TravelAdvice from '../../components/TravelAdvice/TravelAdvice';
import CityReviewsFromPeople from '../../components/CityReviewsFromPeople/CityReviewsFromPeople';
import CityImage from '../../components/CityImage/CityImage';
import countries from '../../data/Countries';
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton';
import './CityDetail.css';
import 'leaflet/dist/leaflet.css';

const CityDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city } = location.state;

  const cityData = countries.find(c => c.city === city.city && c.country === city.country);
  const countryNL = cityData ? cityData.countryNL.toLowerCase() : city.country.toLowerCase();

  return (
    <>
      <div className="header-buttons">
        <button className='back-button' onClick={() => navigate('/bestemmingen')}>
          &larr; Terug naar alle bestemmingen
        </button>
        <FavoriteButton city={city} />
      </div>
      <CityHeader city={city.city} country={city.country} flag={cityData?.flag || `https://flagcdn.com/w320/${city.country.toLowerCase()}.png`} />
      <div className='city-detail'>
        <CityImage city={city.city} className="city-detail-image" />
        <CityInfo 
          city={city.city} 
          country={city.country} 
          bestTravelTime={city.bestTravelTime} 
          budget={city.budget} // Controleer of budget hier correct wordt doorgegeven
        />
        <CityActivities city={city.city} />
        <CityFood city={city.city} nationality={cityData?.nationality} />
        <CityMap city={city.city} country={city.country} />
        <TravelAdvice cityData={cityData} city={city.city} />
        <CityReviewsFromPeople city={city.city} />
      </div>
    </>
  );
};

export default CityDetail;
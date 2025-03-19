import React from 'react';
import countries from '../../data/Countries';

const CityHeader = ({ city, country }) => {
  const getCountryCode = () => {
    const cityData = countries.find(c => c.city === city && c.country === country);
    return cityData?.countryCode.toLowerCase() || 'unknown';
  };

  const flagUrl = `https://flagcdn.com/w80/${getCountryCode()}.png`;

  return (
    <div className='city-header'>
      <h1>Meer informatie over: {city}, {country}</h1>
      {flagUrl && (
        <img 
          src={flagUrl} 
          alt={`Vlag van ${country}`} 
          className='country-flag'
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}
    </div>
  );
};

export default CityHeader;
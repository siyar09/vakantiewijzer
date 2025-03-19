import React from 'react';

const TravelAdvice = ({ cityData, city }) => {
  return (
    <div className='travel-advice'>
      <h2>Reisadvies</h2>
      <hr />
      <a 
        href={`https://www.nederlandwereldwijd.nl/reisadvies/${(cityData ? cityData.countryNL : city.country).toLowerCase().replace(/\s+/g, '-')}`} 
        target="_blank" 
        rel="noopener noreferrer">
        Bekijk het reisadvies voor {cityData ? cityData.countryNL : city.country}
      </a>
    </div>
  );
};

export default TravelAdvice;
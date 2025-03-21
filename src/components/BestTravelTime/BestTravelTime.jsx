import React from 'react';

export const TRAVEL_TIMES = {
  WINTER: 'Winter',
  SPRING_FALL: 'Lente/Herfst',
  FALL_SUMMER: 'Herfst/Zomer',
  SUMMER: 'Zomer',
};

const determineBestTravelTime = (temperature) => {
  if (!temperature) return 'Onbekend';
  
  // Bepaal beste reistijd op basis van temperatuur
  if (temperature <= 0) { // Added condition for below zero
    return TRAVEL_TIMES.SUMMER;
  } else if (temperature > 0 && temperature <= 10) {
    return TRAVEL_TIMES.SUMMER;
  } else if (temperature > 10 && temperature <= 20) {
    return TRAVEL_TIMES.SPRING_FALL;
  } else if (temperature > 20 && temperature <= 28) {
    return TRAVEL_TIMES.FALL_SUMMER;
  } else {
    return TRAVEL_TIMES.WARM;
  }
};

const BestTravelTime = ({ temperature }) => {
  const bestTravelTime = determineBestTravelTime(temperature);
  
  return (
    <div> 
      <p><strong>Beste reistijd: </strong>{bestTravelTime}</p>
    </div>
  );
};

export { determineBestTravelTime };
export default BestTravelTime;
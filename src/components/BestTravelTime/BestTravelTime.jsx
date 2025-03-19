import React from 'react';

const getCurrentSeason = () => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'Lente';
  if (month >= 5 && month <= 7) return 'Zomer';
  if (month >= 8 && month <= 10) return 'Herfst';
  return 'Winter';
};

const determineBestTravelTime = () => {
  const currentSeason = getCurrentSeason();
  return currentSeason;
};

const BestTravelTime = ({ bestTravelTime }) => {
  return (
    <div> 
      <p><strong>Beste reistijd: </strong>{bestTravelTime || determineBestTravelTime()}</p>
    </div>
  );
};

export { getCurrentSeason, determineBestTravelTime };
export default BestTravelTime;
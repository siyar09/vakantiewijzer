import React from 'react';
import CityList from '../../components/CityList/CityList';

const Recommendation = ({ recommendations }) => {
  return (
    <div className="recommendation">
      <h3>Op basis van je antwoorden raden we de volgende bestemmingen aan:</h3>
      <CityList cityData={recommendations} showDetails={false} />
      {recommendations.map((recommendation, index) => (
        <div key={index} className="recommendation-item">
        </div>
      ))}
    </div>
  );
};

export default Recommendation;
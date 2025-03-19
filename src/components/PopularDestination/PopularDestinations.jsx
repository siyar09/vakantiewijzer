import React from 'react';
import './PopularDestinations.css';
import CityImage from '../CityImage/CityImage';
import descriptions from '../../data/descriptions.json';
import { Link } from 'react-router-dom';

const destinations = [
  { city: 'Rome', country: 'Italy', budget: 'Gemiddeld' },
  { city: 'New York', country: 'United States', budget: 'Duur' },
  { city: 'Paris', country: 'France', budget: 'Gemiddeld' }
];

const PopularDestinations = () => {
  return (
    <div className="popular-destinations-container">
      <h1>Populaire Bestemmingen</h1>
      <div className="popular-destinations-inner">
        {destinations.map((destination, index) => (
          <article key={index} className="destination-article">
            <div className="destination-image-wrapper">
              <CityImage city={destination.city} className="destination-image" />
            </div>
            <div className="destination-info">
              <h4>{destination.city}, {destination.country}</h4>
              <div className="destination-title-underline"></div>
              <p>{descriptions[destination.city]}</p>
              <Link 
                to={`/city/${destination.city}`} 
                className="destination-link"
                state={{ city: destination }}
              >
                Meer ontdekken
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
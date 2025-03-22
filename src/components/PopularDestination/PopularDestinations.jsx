import React from 'react';
import './PopularDestinations.css';
import CityImage from '../CityImage/CityImage';
import descriptions from '../../data/descriptions.json';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const destinations = [
  {
    city: 'Tokyo',
    country: 'Japan',
    budget: 'Goedkoop',
    highlight: 'De stad van de toekomst'
  },
  { 
    city: 'New York', 
    country: 'United States', 
    budget: 'Duur',
    highlight: 'De stad die nooit slaapt' 
  },
  { 
    city: 'Paris', 
    country: 'France', 
    budget: 'Gemiddeld',
    highlight: 'Stad van de liefde en cultuur' 
  },
];

const PopularDestinations = () => {
  return (
    <section className="popular-destinations-section">
      <div className="popular-destinations-container">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Populaire Bestemmingen
        </motion.h1>
        
        <div className="destinations-grid">
          {destinations.map((destination, index) => (
            <motion.article 
              key={destination.city}
              className="destination-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="destination-image-wrapper">
                <CityImage city={destination.city} className="destination-image" />
                <div className="destination-overlay">
                  <span className="budget-tag">{destination.budget}</span>
                </div>
              </div>
              
              <div className="destination-content">
                <h3>{destination.city}, {destination.country}</h3>
                <p className="destination-highlight">{destination.highlight}</p>
                <p className="destination-description">{descriptions[destination.city]}</p>
                <Link 
                  to={`/city/${destination.city}`} 
                  className="explore-button"
                  state={{ city: destination }}
                >
                  Ontdek Meer
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
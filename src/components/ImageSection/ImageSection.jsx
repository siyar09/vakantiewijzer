import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import './ImageSection.css';

const ImageSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Ontdek Je Perfecte Bestemming</h1>
          <p>Laat ons je helpen bij het vinden van je droomvakantie</p>
          <div className="hero-buttons">
            <motion.button 
              className="primary-button"
              onClick={() => navigate('/keuzehulp')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start De Keuzehulp
            </motion.button>
            <motion.button 
              className="secondary-button"
              onClick={() => navigate('/bestemmingen')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Bekijk Bestemmingen
            </motion.button>
          </div>
        </motion.div>
      </div>
      <div className="hero-overlay"></div>
    </section>
  );
};

export default ImageSection;
import React from 'react';
import { motion } from 'framer-motion';
import { FaPlane, FaCompass, FaMapMarkedAlt } from 'react-icons/fa';
import './AboutUs.css';

const AboutUs = () => {
  const features = [
    {
      icon: <FaCompass />,
      title: "Persoonlijk Advies",
      description: "Op basis van jouw voorkeuren vinden wij de perfecte bestemming"
    },
    {
      icon: <FaPlane />,
      title: "Wereldwijde Bestemmingen",
      description: "Van tropische stranden tot historische steden"
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Slimme Keuzehulp",
      description: "Ontdek nieuwe plekken die perfect bij jouw reisstijl passen"
    }
  ];

  return (
    <section className='about-section'>
      <motion.div 
        className="about-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Over VakantieWijzer</h1>
        <p className="main-description">
          Welkom bij VakantieWijzer, dé tool om jouw ideale vakantiebestemming te vinden! 
          Wij maken het kiezen van je volgende avontuur eenvoudig en persoonlijk.
        </p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="cta-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p>Waar gaat jouw volgende avontuur naartoe? Ontdek het met VakantieWijzer!</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
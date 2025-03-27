import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact</h3>
          <motion.a 
            href="mailto:info@vakantiewijzer.nl"
            className="contact-link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope className="contact-icon" />
            info@vakantiewijzer.nl
          </motion.a>
        </div>

        <div className="footer-section">
          <h3>Links</h3>
          <div className="footer-links">
            <motion.div whileHover={{ x: 5 }}>
              <Link to="/algemene-informatie">Algemene Informatie</Link>
            </motion.div>
            <motion.div whileHover={{ x: 5 }}>
              <Link to="/privacybeleid">Privacybeleid</Link>
            </motion.div>
            <motion.div whileHover={{ x: 5 }}>
              <Link to="/bestemmingen">Bestemmingen</Link>
            </motion.div>
          </div>
        </div>

        <div className="footer-section">
          <h3>Volg ons</h3>
          <div className="social-links">
            <motion.a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaInstagram className="social-icon instagram" />
            </motion.a>
            <motion.a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFacebook className="social-icon facebook" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin className="social-icon linkedin" />
            </motion.a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} VakantieWijzer. Alle rechten voorbehouden.</p>
      </div>
    </footer>
  );
};

export default Footer;
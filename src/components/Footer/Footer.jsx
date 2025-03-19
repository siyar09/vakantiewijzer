import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import instagramIcon from '../../assets/instagram.png'; 
import facebookIcon from '../../assets/facebook.png';
import linkedinIcon from '../../assets/linkedin.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>contact: info@vakantiewijzer.nl</p>
        </div>
        <div className="footer-right">
          <p>Volg ons op:</p>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" /> 
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={facebookIcon} alt="Facebook" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" />
          </a>
        </div>
      </div>
      <div className="footer-center">
        <p><Link to="/algemene-informatie">Algemene Informatie</Link></p>
        <p>© 2025 VakantieWijzer. Alle rechten voorbehouden.</p>
      </div>
    </footer>
  );
};

export default Footer;
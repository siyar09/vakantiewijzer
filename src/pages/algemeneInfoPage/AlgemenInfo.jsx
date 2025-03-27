import React from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaQuestion, FaLanguage, FaShieldAlt, FaEnvelope, FaStar, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import './AlgemeneInfo.css';

const GeneralInfo = () => {
  const sections = [
    {
      icon: <FaInfoCircle />,
      title: "Algemene Informatie",
      content: "Welkom bij VakantieWijzer! Onze applicatie helpt je bij het vinden van de perfecte vakantiebestemming op basis van jouw voorkeuren. Of je nu op zoek bent naar een zonnige strandvakantie, een avontuurlijke reis of een culturele stedentrip, VakantieWijzer staat voor je klaar.",
      isHeader: true
    },
    {
      icon: <FaQuestion />,
      title: "Hoe werkt het?",
      content: "Onze intelligente keuzehulp stelt je een aantal gerichte vragen over je reisvoorkeuren, zoals het gewenste klimaat, de afstand die je wilt reizen en of je van activiteiten houdt. Op basis van je antwoorden analyseren wij de beste match en geven we je gepersonaliseerde aanbevelingen voor vakantiebestemmingen."
    },
    {
      icon: <FaLanguage />,
      title: "Waarom worden de bestemmingen in het Engels weergegeven?",
      content: "De bestemmingsinformatie en beschrijvingen worden direct opgehaald via een externe API. Aangezien deze API geen gratis vertaalfunctionaliteit biedt en de kosten voor vertalingen aanzienlijk kunnen oplopen, hebben we ervoor gekozen om de informatie in het Engels te tonen. Wij adviseren om gebruik te maken van online vertaalhulpmiddelen indien nodig."
    },
    {
      icon: <FaShieldAlt />,
      title: "Betrouwbaarheid en nauwkeurigheid",
      content: "Wij streven ernaar om de meest actuele en relevante informatie te bieden. De bestemmingsgegevens worden regelmatig bijgewerkt en zijn gebaseerd op betrouwbare bronnen. Houd er echter rekening mee dat reisinformatie kan veranderen en we raden aan om altijd officiële reisadviezen en lokale regelgeving te controleren voordat je een reis boekt."
    }
  ];

  const socialLinks = [
    { icon: <FaInstagram />, url: "https://www.instagram.com", name: "Instagram" },
    { icon: <FaFacebook />, url: "https://www.facebook.com", name: "Facebook" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com", name: "LinkedIn" }
  ];

  return (
    <motion.div 
      className="general-info-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="general-info-container">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            className={`info-section ${section.isHeader ? 'header-section' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="section-header">
              <span className="section-icon">{section.icon}</span>
              {section.isHeader ? (
                <h1>{section.title}</h1>
              ) : (
                <h2>{section.title}</h2>
              )}
            </div>
            <p>{section.content}</p>
          </motion.div>
        ))}

        <motion.div 
          className="contact-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="section-header">
            <span className="section-icon"><FaEnvelope /></span>
            <h2>Contact</h2>
          </div>
          <p>Heb je vragen, suggesties of opmerkingen? Neem gerust contact met ons op via:</p>
          <motion.a 
            href="mailto:info@vakantiewijzer.nl"
            className="contact-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope /> info@vakantiewijzer.nl
          </motion.a>
        </motion.div>

        <motion.div 
          className="social-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="section-header">
            <span className="section-icon"><FaStar /></span>
            <h2>Volg ons</h2>
          </div>
          <p>Wil je op de hoogte blijven van de nieuwste reistips, trends en updates? Volg ons op sociale media:</p>
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
              >
                {link.icon}
                <span>{link.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GeneralInfo;
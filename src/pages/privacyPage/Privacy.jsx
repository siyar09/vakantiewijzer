import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaEnvelope, FaLock, FaCookie, FaUserShield } from 'react-icons/fa';
import './Privacy.css';

const Privacy = () => {
  const sections = [
    {
      id: 1,
      title: "Inleiding",
      icon: <FaShieldAlt />,
      content: (
        <p>VakantieWijzer hecht grote waarde aan de bescherming van uw privacy. In dit privacybeleid leggen we uit hoe we uw persoonlijke gegevens verzamelen, gebruiken en beschermen.</p>
      )
    },
    {
      id: 2,
      title: "Gegevensverzameling",
      icon: <FaUserShield />,
      content: (
        <>
          <p>Wij verzamelen de volgende gegevens:</p>
          <ul>
            <li>Voor en Achternaam</li>
            <li>E-mailadres</li>
            <li>Gebruikersnaam</li>
            <li>Zoekgeschiedenis en voorkeuren</li>
          </ul>
        </>
      )
    },
    {
      id: 3,
      title: "Gebruik van Gegevens",
      icon: <FaLock />,
      content: (
        <>
          <p>Uw gegevens worden gebruikt voor:</p>
          <ul>
            <li>Het personaliseren van uw reiservaring</li>
            <li>Het verbeteren van onze dienstverlening</li>
            <li>Het versturen van relevante reisaanbevelingen</li>
            <li>Het beveiligen van uw account</li>
          </ul>
        </>
      )
    },
    {
      id: 4,
      title: "Gegevensbescherming",
      icon: <FaShieldAlt />,
      content: (
        <>
          <p>We beschermen uw gegevens door:</p>
          <ul>
            <li>Gebruik van versleutelde verbindingen</li>
            <li>Regelmatige veiligheidsaudits</li>
            <li>Beperkte toegang tot persoonlijke gegevens</li>
            <li>Strikte procedures voor gegevensverwerking</li>
          </ul>
        </>
      )
    },
    {
      id: 5,
      title: "Uw Rechten",
      icon: <FaUserShield />,
      content: (
        <>
          <p>U heeft het recht om:</p>
          <ul>
            <li>Uw gegevens in te zien</li>
            <li>Uw gegevens te laten corrigeren</li>
            <li>Uw gegevens te laten verwijderen</li>
            <li>Een klacht in te dienen</li>
          </ul>
        </>
      )
    },
    {
      id: 6,
      title: "Cookies",
      icon: <FaCookie />,
      content: (
        <>
          <p>We gebruiken cookies om:</p>
          <ul>
            <li>Uw voorkeuren te onthouden</li>
            <li>De website te optimaliseren</li>
            <li>Gebruiksstatistieken te verzamelen</li>
          </ul>
        </>
      )
    },
    {
      id: 7,
      title: "Contact",
      icon: <FaEnvelope />,
      content: (
        <>
          <p>Voor vragen over ons privacybeleid kunt u contact opnemen via:</p>
          <motion.a 
            href="mailto:info@vakantiewijzer.nl"
            className="contact-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope /> info@vakantiewijzer.nl
          </motion.a>
        </>
      )
    }
  ];

  return (
    <motion.div 
      className="privacy-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="privacy-container">
        <motion.div 
          className="privacy-header"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FaShieldAlt className="shield-icon" />
          <h1>Privacybeleid</h1>
          <p className="header-description">
            Hoe wij omgaan met uw persoonlijke gegevens
          </p>
        </motion.div>

        <div className="privacy-content">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <h2>
                <span className="section-icon">{section.icon}</span>
                {section.id}. {section.title}
              </h2>
              {section.content}
            </motion.section>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Privacy;
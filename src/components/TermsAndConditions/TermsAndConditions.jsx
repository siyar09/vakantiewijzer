import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheckCircle, FaBook, FaScroll } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import './TermsAndConditions.css';

const TermsAndConditions = ({ accepted, onAcceptChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 1) {
      setHasScrolledToBottom(true);
    }
  };

  const termsContent = (
    <motion.div 
      className="terms-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onScroll={handleScroll}
    >
      <div className="modal-header">
        <motion.h2 
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaScroll className="terms-icon" /> Algemene Voorwaarden
        </motion.h2>
        <motion.button 
          className="modal-close"
          onClick={() => setShowModal(false)}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaTimes />
        </motion.button>
      </div>

      <div className="terms-text">
        <section>
          <h3>1. Algemeen</h3>
          <p>Deze algemene voorwaarden zijn van toepassing op het gebruik van VakantieWijzer. Door gebruik te maken van onze service, ga je akkoord met deze voorwaarden.</p>
        </section>
        
        <section>
          <h3>2. Account Registratie</h3>
          <p>Bij het aanmaken van een account bevestig je dat:</p>
          <ul>
            <li>De verstrekte informatie juist, actueel en volledig is.</li>
            <li>Je verantwoordelijk bent voor de beveiliging van je accountgegevens, inclusief je wachtwoord.</li>
            <li>Je je account niet deelt met derden en verantwoordelijk bent voor alle activiteiten die onder jouw account plaatsvinden.</li>
          </ul>
        </section>

        <section>
          <h3>3. Privacy</h3>
          <p>
            Wij respecteren je privacy en behandelen je persoonsgegevens volgens onze{' '}
            <motion.span 
              className="terms-link"
              whileHover={{ scale: 1.05 }}
            >
              <Link to="/privacybeleid" target="_blank" rel="noopener noreferrer">
                privacyverklaring
              </Link>
            </motion.span>
            . Wij verzamelen en verwerken gegevens in overeenstemming met de geldende wet- en regelgeving.
          </p>
        </section>

        <section>
          <h3>4. Gebruik van de Service</h3>
          <p>Bij het gebruik van VakantieWijzer stem je ermee in om:</p>
          <ul>
            <li>De service niet te gebruiken voor illegale of ongeoorloofde doeleinden.</li>
            <li>Geen schadelijke software, virussen of spam te verspreiden via onze service.</li>
            <li>Geen misbruik te maken van de systemen en infrastructuur van VakantieWijzer.</li>
          </ul>
        </section>

        <section>
          <h3>5. Intellectueel Eigendom</h3>
          <p>Alle content en materialen binnen VakantieWijzer, inclusief maar niet beperkt tot tekst, afbeeldingen en software, zijn eigendom van VakantieWijzer of de respectieve rechthebbenden. Het is niet toegestaan om deze te kopiëren, verspreiden of hergebruiken zonder schriftelijke toestemming.</p>
        </section>

        <section>
          <h3>6. Beëindiging van de Dienst</h3>
          <p>Wij behouden ons het recht voor om de toegang tot onze service te beperken of te beëindigen als je handelt in strijd met deze algemene voorwaarden.</p>
        </section>

        <section>
          <h3>7. Aansprakelijkheid</h3>
          <p>VakantieWijzer is niet aansprakelijk voor directe of indirecte schade die voortvloeit uit het gebruik van onze service. Wij garanderen niet dat de service te allen tijde ononderbroken en foutloos zal functioneren.</p>
        </section>
      </div>

      <AnimatePresence>
        {!hasScrolledToBottom && (
          <motion.div 
            className="scroll-indicator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <FaBook className="scroll-icon" />
            Scroll naar beneden om alles te lezen
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {termsContent}
      </Modal>
      
      <motion.div 
        className="terms-checkbox"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="terms"
            checked={accepted}
            onChange={(e) => onAcceptChange(e.target.checked)}
            required
          />
          <motion.span 
            className="checkmark"
            animate={accepted ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <FaCheckCircle />
          </motion.span>
        </div>
        <label htmlFor="terms">
          Ik ga akkoord met de{' '}
          <motion.span 
            className="terms-link"
            onClick={() => setShowModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            algemene voorwaarden
          </motion.span>
        </label>
      </motion.div>
    </>
  );
};

export default TermsAndConditions;
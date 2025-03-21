import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import './TermsAndConditions.css';

const TermsAndConditions = ({ accepted, onAcceptChange }) => {
  const [showModal, setShowModal] = useState(false);

  const termsContent = (
    <div className="terms-content">
      <div className="modal-header">
        <h2>Algemene Voorwaarden</h2>
        <button 
          className="modal-close" 
          onClick={() => setShowModal(false)}
        >
          ×
        </button>
      </div>
      <div className="terms-text">
        <h3>1. Algemeen</h3>
        <p>Deze algemene voorwaarden zijn van toepassing op het gebruik van VakantieWijzer. Door gebruik te maken van onze service, ga je akkoord met deze voorwaarden.</p>
        
        <h3>2. Account Registratie</h3>
        <p>Bij het aanmaken van een account bevestig je dat:</p>
        <ul>
          <li>De verstrekte informatie juist, actueel en volledig is.</li>
          <li>Je verantwoordelijk bent voor de beveiliging van je accountgegevens, inclusief je wachtwoord.</li>
          <li>Je je account niet deelt met derden en verantwoordelijk bent voor alle activiteiten die onder jouw account plaatsvinden.</li>
        </ul>

        <h3>3. Privacy</h3>
        <p>Wij respecteren je privacy en behandelen je persoonsgegevens volgens onze{' '}
            <Link to="/privacybeleid" target="_blank" rel="noopener noreferrer">
                privacyverklaring
            </Link>
            . Wij verzamelen en verwerken gegevens in overeenstemming met de geldende wet- en regelgeving.
        </p>
        <h3>4. Gebruik van de Service</h3>
        <p>Bij het gebruik van VakantieWijzer stem je ermee in om:</p>
        <ul>
          <li>De service niet te gebruiken voor illegale of ongeoorloofde doeleinden.</li>
          <li>Geen schadelijke software, virussen of spam te verspreiden via onze service.</li>
          <li>Geen misbruik te maken van de systemen en infrastructuur van VakantieWijzer.</li>
        </ul>

        <h3>5. Intellectueel Eigendom</h3>
        <p>Alle content en materialen binnen VakantieWijzer, inclusief maar niet beperkt tot tekst, afbeeldingen en software, zijn eigendom van VakantieWijzer of de respectieve rechthebbenden. Het is niet toegestaan om deze te kopiëren, verspreiden of hergebruiken zonder schriftelijke toestemming.</p>

        <h3>6. Beëindiging van de Dienst</h3>
        <p>Wij behouden ons het recht voor om de toegang tot onze service te beperken of te beëindigen als je handelt in strijd met deze algemene voorwaarden.</p>

        <h3>7. Aansprakelijkheid</h3>
        <p>VakantieWijzer is niet aansprakelijk voor directe of indirecte schade die voortvloeit uit het gebruik van onze service. Wij garanderen niet dat de service te allen tijde ononderbroken en foutloos zal functioneren.</p>
      </div>
    </div>
  );

  return (
    <>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {termsContent}
      </Modal>
      
      <div className="terms-checkbox">
        <input
          type="checkbox"
          id="terms"
          checked={accepted}
          onChange={(e) => onAcceptChange(e.target.checked)}
          required
        />
        <label htmlFor="terms">
          Ik ga akkoord met de{' '}
          <span 
            className="terms-link"
            onClick={() => setShowModal(true)}
          >
            algemene voorwaarden
          </span>
        </label>
      </div>
    </>
  );
};

export default TermsAndConditions;

import React from 'react';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-container">
      <h1>Privacybeleid</h1>
      <div className="privacy-content">
        <section>
          <h2>1. Inleiding</h2>
          <p>VakantieWijzer hecht grote waarde aan de bescherming van uw privacy. In dit privacybeleid leggen we uit hoe we uw persoonlijke gegevens verzamelen, gebruiken en beschermen.</p>
        </section>

        <section>
          <h2>2. Gegevensverzameling</h2>
          <p>Wij verzamelen de volgende gegevens:</p>
          <ul>
            <li>Voor en Achternaam</li>
            <li>E-mailadres</li>
            <li>Gebruikersnaam</li>
            <li>Zoekgeschiedenis en voorkeuren</li>
          </ul>
        </section>

        <section>
          <h2>3. Gebruik van Gegevens</h2>
          <p>Uw gegevens worden gebruikt voor:</p>
          <ul>
            <li>Het personaliseren van uw reiservaring</li>
            <li>Het verbeteren van onze dienstverlening</li>
            <li>Het versturen van relevante reisaanbevelingen</li>
            <li>Het beveiligen van uw account</li>
          </ul>
        </section>

        <section>
          <h2>4. Gegevensbescherming</h2>
          <p>We beschermen uw gegevens door:</p>
          <ul>
            <li>Gebruik van versleutelde verbindingen</li>
            <li>Regelmatige veiligheidsaudits</li>
            <li>Beperkte toegang tot persoonlijke gegevens</li>
            <li>Strikte procedures voor gegevensverwerking</li>
          </ul>
        </section>

        <section>
          <h2>5. Uw Rechten</h2>
          <p>U heeft het recht om:</p>
          <ul>
            <li>Uw gegevens in te zien</li>
            <li>Uw gegevens te laten corrigeren</li>
            <li>Uw gegevens te laten verwijderen</li>
            <li>Een klacht in te dienen</li>
          </ul>
        </section>

        <section>
          <h2>6. Cookies</h2>
          <p>We gebruiken cookies om:</p>
          <ul>
            <li>Uw voorkeuren te onthouden</li>
            <li>De website te optimaliseren</li>
            <li>Gebruiksstatistieken te verzamelen</li>
          </ul>
        </section>

        <section>
          <h2>7. Contact</h2>
          <p>Voor vragen over ons privacybeleid kunt u contact opnemen via:</p>
          <ul>
          <li>Email: <a href="mailto:info@vakantiewijzer.nl">info@vakantiewijzer.nl</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
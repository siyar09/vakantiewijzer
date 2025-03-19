import React from 'react';
import './GeneralInfo.css';

const GeneralInfo = () => {
  return (
    <div className="general-info-container">
      <h1>Algemene Informatie</h1>
      <p className='general-info-text'>Welkom bij VakantieWijzer! Onze applicatie helpt je bij het vinden van de perfecte vakantiebestemming op basis van jouw voorkeuren. Of je nu op zoek bent naar een zonnige strandvakantie, een avontuurlijke reis of een culturele stedentrip, VakantieWijzer staat voor je klaar.</p>
      
      <h2>Hoe werkt het?</h2>
      <hr />
      <p>Onze intelligente quiz stelt je een aantal gerichte vragen over je reisvoorkeuren, zoals het gewenste klimaat, de afstand die je wilt reizen en de activiteiten die je wilt ondernemen. Op basis van je antwoorden analyseren wij de beste match en geven we je gepersonaliseerde aanbevelingen voor vakantiebestemmingen.</p>
      
      <h2>Waarom worden de bestemmingen in het Engels weergegeven?</h2>
      <hr />
      <p>De bestemmingsinformatie en beschrijvingen worden direct opgehaald via een externe API. Aangezien deze API geen gratis vertaalfunctionaliteit biedt en de kosten voor vertalingen aanzienlijk kunnen oplopen, hebben we ervoor gekozen om de informatie in het Engels te tonen. Wij adviseren om gebruik te maken van online vertaalhulpmiddelen indien nodig.</p>
      
      <h2>Betrouwbaarheid en nauwkeurigheid</h2>
      <hr />
      <p>Wij streven ernaar om de meest actuele en relevante informatie te bieden. De bestemmingsgegevens worden regelmatig bijgewerkt en zijn gebaseerd op betrouwbare bronnen. Houd er echter rekening mee dat reisinformatie kan veranderen en we raden aan om altijd officiële reisadviezen en lokale regelgeving te controleren voordat je een reis boekt.</p>
      
      <h2>Contact</h2>
      <hr />
      <p>Heb je vragen, suggesties of opmerkingen? Neem gerust contact met ons op via:</p>
      <p>Email: <a href="mailto:info@vakantiewijzer.nl">info@vakantiewijzer.nl</a></p>
      
      <h2>Volg ons</h2>
      <hr />
      <p>Wil je op de hoogte blijven van de nieuwste reistips, trends en updates? Volg ons op sociale media:</p>
      <ul>
        <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
        <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
      </ul>
    </div>
  );
};

export default GeneralInfo;

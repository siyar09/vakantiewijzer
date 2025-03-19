import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import NotificationBar from '../../components/NotificationBar/NotificationBar';
import ChecklistSection from '../../components/ChecklistSection/ChecklistSection';
import './ReisCheck.css';

const ReisCheck = () => {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [checklist, setChecklist] = useState({
    algemene: [],
    strand: [],
    backpack: [],
    kampeer: [],
    vliegreis: []
  });
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const username = decodedToken.sub;
      setUsername(username);

      const savedChecklist = JSON.parse(localStorage.getItem(`checklist_${username}`));
      if (savedChecklist) {
        setChecklist(savedChecklist);
      }
    }
  }, []);

  const handleCheckboxChange = (section, index) => {
    const newChecklist = { ...checklist };
    newChecklist[section][index] = !newChecklist[section][index];
    setChecklist(newChecklist);
  };

  const handleSaveClick = () => {
    localStorage.setItem(`checklist_${username}`, JSON.stringify(checklist));
    setIsNotificationVisible(true);
    setTimeout(() => {
      setIsNotificationVisible(false);
    }, 3000); // Verberg de notificatie na 3 seconden
  };

  return (
    <>
      <NotificationBar isVisible={isNotificationVisible} message="Checklist opgeslagen!" />
      <div className="reis-check-container">
        <h1>Mijn Reis Checklist</h1>
        <p>Vergeet nooit meer iets met onze handige reischecklists! Of je nu een citytrip, strandvakantie of kampeeravontuur plant, wij hebben een checklist die je helpt om goed voorbereid op reis te gaan.</p>
        
        <ChecklistSection
          title="Algemene paklijst"
          items={['Paspoort / ID-kaart', 'Reisverzekering & documenten', 'Bankpassen & contant geld', 'Telefoon + oplader', 'Medicatie + EHBO-kit', 'Toilettas (tandpasta, deodorant, scheermesje, etc.)', 'Zonnebril', 'Oordopjes / koptelefoon', 'Boek / e-reader', 'Kleding afgestemd op het weer', 'Comfortabele schoenen']}
          checklist={checklist}
          section="algemene"
          handleCheckboxChange={handleCheckboxChange}
        />

        <ChecklistSection
          title="Strandvakantie checklist"
          items={['Zonnebrandcrème (hoge factor)', 'Aftersun / aloe vera gel', 'Zonnebril & hoed/pet', 'Badkleding', 'Strandlaken of handdoek', 'Slippers of sandalen', 'Waterdichte tas voor waardevolle spullen', 'Snorkelset', 'Strandparasol (indien nodig)', 'Zwemshort / bikini / badpak', 'Koelbox of herbruikbare waterfles']}
          checklist={checklist}
          section="strand"
          handleCheckboxChange={handleCheckboxChange}
        />

        <ChecklistSection
          title="Backpack checklist"
          items={['Stevige backpack (handbagageformaat of groter)', 'Packing cubes voor efficiënt inpakken', 'Lichtgewicht kleding in laagjes', 'Sneldrogende handdoek', 'Powerbank & universele stekker', 'EHBO-kit + tekentang', 'Waterfilter of zuiveringstabletten', 'Dagrugzak', 'Multifunctioneel mes (bijv. Zwitsers zakmes)', 'Lakenzak voor hostels of nachttreinen', 'Notitieboekje / reisdagboek']}
          checklist={checklist}
          section="backpack"
          handleCheckboxChange={handleCheckboxChange}
        />

        <ChecklistSection
          title="Kampeer checklist"
          items={['Tent + haringen + scheerlijnen', 'Slaapzak & matje', 'Campingkookstel + gas', 'Borden, bestek & bekers', 'Zaklamp / hoofdlamp + extra batterijen', 'Opvouwbare stoel of mat', 'Warme kleding (voor koude nachten)', 'Insectenspray', 'Vuilniszakken (leave no trace!)', 'Aanmaakblokjes / lucifers / aansteker', 'Navigatie (kaart, GPS of kompas)']}
          checklist={checklist}
          section="kampeer"
          handleCheckboxChange={handleCheckboxChange}
        />

        <ChecklistSection
          title="Vliegreis checklist"
          items={['Paspoort + visum (indien nodig)', 'Boardingpass (digitaal of geprint)', 'Handbagagekoffer of rugzak', 'Snacks voor onderweg', 'Waterfles (leeg meenemen en na security vullen)', 'Warme trui / sjaal (voor de airco in het vliegtuig)', 'Oordopjes / slaapmasker', 'Draagbare oplader', 'Tandenborstel en mini-toilettas', 'Tijdverdrijf (boek, puzzel, muziek)', 'Reisziektepillen (indien nodig)']}
          checklist={checklist}
          section="vliegreis"
          handleCheckboxChange={handleCheckboxChange}
        />

        <button className="save-button" onClick={handleSaveClick}>Opslaan</button>
      </div>
    </>
  );
};

export default ReisCheck;
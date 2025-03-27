import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import { 
  FaSave, 
  FaPlane, 
  FaUmbrella, 
  FaSuitcase,
  FaCampground, 
  FaList 
} from 'react-icons/fa';
import Popup from '../../components/Popup/Popup';
import ChecklistSection from '../../components/ChecklistSection/ChecklistSection';
import './ReisCheck.css';

const checklistData = {
  algemene: {
    icon: <FaList />,
    title: "Algemene paklijst",
    items: [
      'Paspoort / ID-kaart',
      'Reisverzekering & documenten',
      'Bankpassen & contant geld',
      'Telefoon + oplader',
      'Medicatie + EHBO-kit',
      'Toilettas (tandpasta, deodorant, scheermesje, etc.)',
      'Zonnebril',
      'Oordopjes / koptelefoon',
      'Boek / e-reader',
      'Kleding afgestemd op het weer',
      'Comfortabele schoenen'
    ]
  },
  strand: {
    icon: <FaUmbrella />,
    title: "Strandvakantie checklist",
    items: [
      'Zonnebrandcrème (hoge factor)',
      'Aftersun / aloe vera gel',
      'Zonnebril & hoed/pet',
      'Badkleding',
      'Strandlaken of handdoek',
      'Slippers of sandalen',
      'Waterdichte tas voor waardevolle spullen',
      'Snorkelset',
      'Strandparasol (indien nodig)',
      'Zwemshort / bikini / badpak',
      'Koelbox of herbruikbare waterfles'
    ]
  },
  backpack: {
    icon: <FaSuitcase />,
    title: "Backpack checklist",
    items: [
      'Stevige backpack (handbagageformaat of groter)',
      'Packing cubes voor efficiënt inpakken',
      'Lichtgewicht kleding in laagjes',
      'Sneldrogende handdoek',
      'Powerbank & universele stekker',
      'EHBO-kit + tekentang',
      'Waterfilter of zuiveringstabletten',
      'Dagrugzak',
      'Multifunctioneel mes (bijv. Zwitsers zakmes)',
      'Lakenzak voor hostels of nachttreinen',
      'Notitieboekje / reisdagboek'
    ]
  },
  kampeer: {
    icon: <FaCampground />,
    title: "Kampeer checklist",
    items: [
      'Tent + haringen + scheerlijnen',
      'Slaapzak & matje',
      'Campingkookstel + gas',
      'Borden, bestek & bekers',
      'Zaklamp / hoofdlamp + extra batterijen',
      'Opvouwbare stoel of mat',
      'Warme kleding (voor koude nachten)',
      'Insectenspray',
      'Vuilniszakken (leave no trace!)',
      'Aanmaakblokjes / lucifers / aansteker',
      'Navigatie (kaart, GPS of kompas)'
    ]
  },
  vliegreis: {
    icon: <FaPlane />,
    title: "Vliegreis checklist",
    items: [
      'Paspoort + visum (indien nodig)',
      'Boardingpass (digitaal of geprint)',
      'Handbagagekoffer of rugzak',
      'Snacks voor onderweg',
      'Waterfles (leeg meenemen en na security vullen)',
      'Warme trui / sjaal (voor de airco in het vliegtuig)',
      'Oordopjes / slaapmasker',
      'Draagbare oplader',
      'Tandenborstel en mini-toilettas',
      'Tijdverdrijf (boek, puzzel, muziek)',
      'Reisziektepillen (indien nodig)'
    ]
  }
};

const ReisCheck = () => {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [checklist, setChecklist] = useState(() => {
    return Object.keys(checklistData).reduce((acc, section) => {
      acc[section] = new Array(checklistData[section].items.length).fill(false);
      return acc;
    }, {});
  });
  const [username, setUsername] = useState('');

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub;
        setUsername(username);

        const savedChecklist = localStorage.getItem(`checklist_${username}`);
        if (savedChecklist) {
          const parsedChecklist = JSON.parse(savedChecklist);
          const isValid = Object.keys(checklistData).every(
            section => Array.isArray(parsedChecklist[section])
          );
          
          if (isValid) {
            setChecklist(parsedChecklist);
          }
        }
      }
    } catch (error) {
      console.error('Error loading checklist:', error);
      setChecklist(Object.keys(checklistData).reduce((acc, section) => {
        acc[section] = new Array(checklistData[section].items.length).fill(false);
        return acc;
      }, {}));
    }
  }, []);

  const handleCheckboxChange = (section, index) => {
    if (!checklist[section]) return;
    
    setChecklist(prev => ({
      ...prev,
      [section]: prev[section].map((checked, i) => 
        i === index ? !checked : checked
      )
    }));
  };

  const handleSaveClick = () => {
    try {
      if (!username) {
        console.error('No username found');
        return;
      }
      
      localStorage.setItem(`checklist_${username}`, JSON.stringify(checklist));
      setIsNotificationVisible(true);
      
      setTimeout(() => {
        setIsNotificationVisible(false);
      }, 2000); // voor 2 seconden tonen 
    } catch (error) {
      console.error('Error saving checklist:', error);
    }
};

  return (
    <motion.div 
      className="reis-check-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isNotificationVisible && (
        <Popup 
          type="success"
          message="Je checklist is opgeslagen!" 
        />
      )}

      <div className="reis-check-container">
        <motion.div 
          className="header-section"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Mijn Reis Checklist</h1>
          <p>Vergeet nooit meer iets met onze handige reischecklists!</p>
        </motion.div>

        <div className="checklists-grid">
          {Object.entries(checklistData).map(([section, data], index) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ChecklistSection
                title={data.title}
                icon={data.icon}
                items={data.items}
                checklist={checklist[section]}
                section={section}
                handleCheckboxChange={handleCheckboxChange}
              />
            </motion.div>
          ))}
        </div>

        <motion.button 
          className="save-button"
          onClick={handleSaveClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSave /> Opslaan
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ReisCheck;
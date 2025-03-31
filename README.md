# VakantieWijzer 🌍✈️

## 1. Inleiding
VakantieWijzer is een interactieve webapplicatie die je helpt bij het vinden van je ideale vakantiebestemming. Door middel van een keuzehulp, uitgebreide zoekfunctie en persoonlijke voorkeuren krijg je gepersonaliseerde reisaanbevelingen.

### Belangrijkste functionaliteiten:
- **Keuzehulp**: Ontdek je perfecte bestemming via een korte vragenlijst
- **Bestemmingen Verkennen**: Zoek en filter door verschillende vakantiebestemmingen
- **Persoonlijk Account**: Sla je favoriete bestemmingen op
- **Reis Checklist**: Handige paklijsten voor verschillende type reizen
- **Real-time Weer Info**: Actuele weersinformatie van bestemmingen
- **Lokale Gerechten**: Recepten en food informatie via Spoonacular
- **Top Activiteiten**: Aanbevolen activiteiten voor elke bestemming

## 2. Screenshot
![VakantieWijzer Screenshot](./public/home-page-new.jpg)

## 3. Benodigdheden
- Node.js (versie 14.0.0 of hoger)
- npm (versie 6.0.0 of hoger)
- Git
- API keys voor:
  - OpenWeather
  - Yelp Fusion
  - Pixabay
  - Spoonacular
  - OpenTripMap

## 4. De applicatie draaien

### Stap 1: Repository klonen
```bash
git clone https://github.com/jouw-username/vakantiewijzer.git
cd vakantiewijzer
```

### Stap 2: Dependencies installeren
```bash
npm install
```

### Stap 3: Configuratie

#### Voor beoordelaars
Voor testdoeleinden staan de API keys in de `.env` beschikbaar voor de beoordelaars. 

#### Voor overige gebruikers
1. Maak een `.env` bestand aan in de root van het project
2. Vraag API keys aan bij de volgende services:
   - [OpenWeather](https://openweathermap.org/api)
   - [Yelp Fusion](https://www.yelp.com/developers)
   - [Pixabay](https://pixabay.com/api/docs/)
   - [Spoonacular](https://spoonacular.com/food-api)
   - [OpenTripMap](https://dev.opentripmap.org/product)
3. Vul het `.env` bestand met je eigen API keys:
```env
VITE_APP_WEATHER_API_KEY=jouw_openweather_api_key
VITE_APP_YELP_API_KEY=jouw_yelp_api_key
VITE_APP_PIXABAY_API_KEY=jouw_pixabay_api_key
VITE_APP_SPOONACULAR_API_KEY=jouw_spoonacular_api_key
VITE_APP_OPENTRIP_API_KEY=jouw_opentrip_api_key
```

### Stap 4: Applicatie starten
```bash
npm run dev
```

## 5. Overige commando's
- `npm run build`: Bouwt de applicatie voor productie
- `npm run preview`: Start een lokale server om de productie build te testen
- `npm run lint`: Voert ESLint uit voor code kwaliteitscontrole
- `npm run test`: Start de test suite
- `npm run format`: Formatteert de code volgens Prettier regels


## Browser Ondersteuning 🌐
- Chrome (laatste versie)
- Firefox (laatste versie)
- Safari (laatste versie)
- Edge (laatste versie)

## Contact 📧
- Email: info@vakantiewijzer.nl
- Website: [www.vakantiewijzer.nl](https://www.vakantiewijzer.nl)

## Licentie 📄
Dit project is gelicentieerd onder de MIT License.
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
Maak een `.env` bestand aan in de root map met de volgende inhoud:
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
- Build voor productie: `npm run build`
- Preview productie build: `npm run preview`
- Linting: `npm run lint`
- Tests uitvoeren: `npm run test`

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
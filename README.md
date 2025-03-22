# VakantieWijzer 🌍✈️

VakantieWijzer is een interactieve webapplicatie die je helpt bij het vinden van je ideale vakantiebestemming. Door middel van een keuzehulp, uitgebreide zoekfunctie en persoonlijke voorkeuren krijg je gepersonaliseerde reisaanbevelingen.

## Functionaliteiten 🌟

- **Keuzehulp**: Ontdek je perfecte bestemming via een korte vragenlijst
- **Bestemmingen Verkennen**: Zoek en filter door verschillende vakantiebestemmingen
- **Persoonlijk Account**: Sla je favoriete bestemmingen op
- **Reis Checklist**: Handige paklijsten voor verschillende type reizen
- **Real-time Weer Info**: Actuele weersinformatie van bestemmingen
- **Restaurant Tips**: Lokale eetgelegenheden via Yelp
- **Afbeeldingen**: Hoogwaardige foto's via Pixabay
- **Lokale Gerechten**: Recepten en food informatie via Spoonacular

## Vereisten 📋

Voordat je begint, zorg dat je het volgende hebt geïnstalleerd:

- Node.js (versie 14.0.0 of hoger)
- npm (versie 6.0.0 of hoger)
- Git

## Installatie 🚀

1. Clone de repository:
```bash
git clone https://github.com/jouw-username/vakantiewijzer.git
cd vakantiewijzer
```

2. Installeer de benodigde dependencies:
```bash
npm install
```

3. Maak een `.env` bestand aan in de root van het project met de volgende API keys:
```env
VITE_APP_WEATHER_API_KEY=jouw_openweather_api_key
VITE_APP_YELP_API_KEY=jouw_yelp_api_key
VITE_APP_PIXABAY_API_KEY=jouw_pixabay_api_key
VITE_APP_SPOONACULAR_API_KEY=jouw_spoonacular_api_key
```

4. Start de development server:
```bash
npm run dev
```

## API Keys Aanvragen 🔑

Voor het gebruik van de applicatie heb je de volgende API keys nodig:

1. **OpenWeather API**
   - Ga naar [OpenWeather](https://openweathermap.org/api)
   - Maak een account aan
   - Vraag een gratis API key aan

2. **Yelp Fusion API**
   - Ga naar [Yelp Fusion](https://www.yelp.com/developers)
   - Log in of maak een account aan
   - Ga naar het Developers dashboard
   - Creëer een nieuwe app om je API key te krijgen

3. **Pixabay API**
   - Bezoek [Pixabay API](https://pixabay.com/api/docs/)
   - Maak een account aan
   - Vraag een API key aan in je account settings

4. **Spoonacular API**
   - Ga naar [Spoonacular](https://spoonacular.com/food-api)
   - Registreer voor een account
   - Kies een plan (er is een gratis optie beschikbaar)
   - Genereer je API key

## Scripts 📝

- `npm run dev`: Start de development server
- `npm run build`: Bouw de productie versie
- `npm run preview`: Preview de productie build lokaal

## Technologieën 💻

- React 18
- Vite
- Framer Motion
- React Router DOM
- Axios
- JWT Decode

## Browser Ondersteuning 🌐

De applicatie werkt het beste in de volgende browsers:
- Chrome (laatste versie)
- Firefox (laatste versie)
- Safari (laatste versie)
- Edge (laatste versie)

## Bijdragen 🤝

1. Fork het project
2. Maak je feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je veranderingen (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## Contact 📧

Bij vragen of problemen kun je contact opnemen via:
- Email: info@vakantiewijzer.nl
- Website: [www.vakantiewijzer.nl](https://www.vakantiewijzer.nl)

## Licentie 📄

Dit project is gelicentieerd onder de MIT License.
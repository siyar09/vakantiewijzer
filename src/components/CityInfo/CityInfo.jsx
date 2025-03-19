import React, { useEffect, useState } from 'react';
import CityWeather from '../CityWeather/CityWeather';
import CityReviews from '../CityReviews/CityReviews';
import BestTravelTime from '../BestTravelTime/BestTravelTime';
import BudgetCategory from '../BudgetCategory/BudgetCategory';
import descriptions from '../../data/descriptions.json';
import countries from '../../data/Countries';

const WEATHER_API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;

const CityInfo = ({ city, country, bestTravelTime, budget }) => {
  const [language, setLanguage] = useState('');
  const [climate, setClimate] = useState('');
  const [currency, setCurrency] = useState('');
  const [description, setDescription] = useState('');
  const [flag, setFlag] = useState('');
  const [countryName, setCountryName] = useState('');
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countryResponse, weatherResponse, descriptionResponse] = await Promise.all([
          fetch(`https://restcountries.com/v3.1/name/${country}?fields=languages,currencies,flags`),
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`),
          fetch(`https://en.wikivoyage.org/w/api.php?action=query&prop=extracts&exintro&titles=${city}&format=json&origin=*`)
        ]);

        const countryData = await countryResponse.json();
        if (countryData && countryData.length > 0) {
          if (countryData[0].languages) {
            const languages = Object.values(countryData[0].languages).join(', ');
            setLanguage(languages);
          }
          if (countryData[0].currencies) {
            const currencyCode = Object.keys(countryData[0].currencies)[0];
            setCurrency(currencyCode);
          }
          if (countryData[0].flags) {
            setFlag(countryData[0].flags.png);
          }
        }

        const weatherData = await weatherResponse.json();
        if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
          setClimate(weatherData.weather[0].description);
          setTemperature(Math.round(weatherData.main.temp)); // Add temperature state
        }

        const descriptionData = await descriptionResponse.json();
        const page = descriptionData.query.pages[Object.keys(descriptionData.query.pages)[0]];
        if (page && page.extract) {
          const shortDescription = page.extract.substring(0, 500);
          const cleanDescription = shortDescription.replace(/<\/?[^>]+(>|$)/g, "");
          setDescription(cleanDescription);
        } else if (page && page.extract.includes("There is more than one place called")) {
          const fallbackDescription = descriptions[city] || 'Geen beschrijving beschikbaar.';
          setDescription(fallbackDescription);
        } else {
          const fallbackDescription = descriptions[city] || 'Geen beschrijving beschikbaar.';
          setDescription(fallbackDescription);
        }
      } catch (error) {
        console.error('Fout bij ophalen data:', error);
        const fallbackDescription = descriptions[city] || 'Geen beschrijving beschikbaar.';
        setDescription(fallbackDescription);
      }
    };

    fetchData();

    const countryInfo = countries.find(c => c.city === city);
    if (countryInfo) {
      setCountryName(countryInfo.countryNL);
    }
  }, [city, country]);

  return (
    <div className='city-detail-info'>
      <h2>Algemene informatie</h2>
      <hr />
      <p><strong>Beschrijving:</strong> {description}...</p>
      <p><strong>Locatie:</strong> {countryName}</p>
      <CityWeather city={city} />
      <p><strong>Weertype:</strong> {climate || 'Laden...'}</p>
      <BestTravelTime temperature={temperature} />      
      <BudgetCategory budget={budget} />
      <p><strong>Taal:</strong> {language || 'Laden...'}</p>
      <p><strong>Munteenheid:</strong> {currency}</p>
      <CityReviews city={city} />
    </div>
  );
};

export default CityInfo;
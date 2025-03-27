import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CityWeather from '../CityWeather/CityWeather';
import CityReviews from '../CityReviews/CityReviews';
import BestTravelTime from '../BestTravelTime/BestTravelTime';
import BudgetCategory from '../BudgetCategory/BudgetCategory';
import descriptions from '../../data/descriptions.json';
import countries from '../../data/Countries';

const WEATHER_API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const CityInfo = ({ city, country, budget }) => {
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
          axios.get(`https://restcountries.com/v3.1/name/${country}`, {
            params: {
              fields: 'languages,currencies,flags'
            }
          }),
          axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
              q: city,
              appid: WEATHER_API_KEY,
              units: 'metric',
              lang: 'nl'
            }
          }),
          axios.get('https://en.wikivoyage.org/w/api.php', {
            params: {
              action: 'query',
              prop: 'extracts',
              exintro: true,
              titles: city,
              format: 'json',
              origin: '*'
            }
          })
        ]);

        // Handle country data
        if (countryResponse.data && countryResponse.data.length > 0) {
          const countryData = countryResponse.data[0];
          if (countryData.languages) {
            const languages = Object.values(countryData.languages).join(', ');
            setLanguage(languages);
          }
          if (countryData.currencies) {
            const currencyCode = Object.keys(countryData.currencies)[0];
            setCurrency(currencyCode);
          }
          if (countryData.flags) {
            setFlag(countryData.flags.png);
          }
        }

        // Handle weather data
        const weatherData = weatherResponse.data;
        if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
          setClimate(capitalizeFirstLetter(weatherData.weather[0].description));
          setTemperature(Math.round(weatherData.main.temp));
        }

        // Handle description data
        const descriptionData = descriptionResponse.data;
        const page = descriptionData.query.pages[Object.keys(descriptionData.query.pages)[0]];
        if (page && page.extract) {
          const shortDescription = page.extract.substring(0, 500);
          const cleanDescription = shortDescription.replace(/<\/?[^>]+(>|$)/g, "");
          setDescription(cleanDescription);
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
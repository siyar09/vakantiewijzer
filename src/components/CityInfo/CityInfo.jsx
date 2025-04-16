import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CityWeather from '../CityWeather/CityWeather';
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
  const [countryName, setCountryName] = useState('');
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let countryData = null;
      try {
        const countryResponse = await axios.get(`https://restcountries.com/v3.1/name/${country}`, {
          params: {
            fields: 'languages,currencies'
          }
        });
        if (countryResponse.data && countryResponse.data.length > 0) {
          countryData = countryResponse.data[0];
          if (countryData.languages) {
            const languages = Object.values(countryData.languages).join(', ');
            setLanguage(languages);
          }
          if (countryData.currencies) {
            const currencyCode = Object.keys(countryData.currencies)[0];
            setCurrency(currencyCode);
          }
        }
      
      } catch (error) {
        console.error('Fout bij ophalen land data:', error);
        const countryInfo = countries.find(c => c.city === city);
        if (countryInfo?.currencyCode) {
          setCurrency(countryInfo.currencyCode);
        } else {
          setCurrency('Onbekend');
        }
        setLanguage('Onbekend');
      }

      try {
        const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: `${city},${country}`,
            appid: WEATHER_API_KEY,
            units: 'metric',
            lang: 'nl'
          }
        });
        const weatherData = weatherResponse.data;
        if (weatherData?.weather?.[0]) {
          setClimate(capitalizeFirstLetter(weatherData.weather[0].description));
          setTemperature(Math.round(weatherData.main.temp));
        }
      } catch (error) {
        console.error('Fout bij ophalen weer data:', error);
        setClimate('Onbekend');
        setTemperature(null);
      }

      try {
        const descriptionResponse = await axios.get('https://en.wikivoyage.org/w/api.php', {
          params: {
            action: 'query',
            prop: 'extracts',
            exintro: true,
            titles: city,
            format: 'json',
            origin: '*'
          }
        });
        const page = descriptionResponse.data.query.pages[Object.keys(descriptionResponse.data.query.pages)[0]];
        if (page?.extract) {
          const shortDescription = page.extract.substring(0, 500);
          const cleanDescription = shortDescription.replace(/<\/?[^>]+(>|$)/g, "");
          setDescription(cleanDescription);
        } else {
          setDescription(descriptions[city] || 'Geen beschrijving beschikbaar.');
        }
      } catch (error) {
        console.error('Fout bij ophalen beschrijving:', error);
        setDescription(descriptions[city] || 'Geen beschrijving beschikbaar.');
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
      <p><strong>Locatie:</strong> {countryName || 'Laden...'}</p>
      <CityWeather city={city || 'Laden...'} />
      <p><strong>Weertype:</strong> {climate || 'Laden...'}</p>
      <BestTravelTime temperature={temperature || 'Laden...'} />      
      <BudgetCategory budget={budget || 'Laden...'} />
      <p><strong>Taal:</strong> {language || 'Laden...'}</p>
      <p><strong>Munteenheid:</strong> {currency || 'Laden...'}</p>
    </div>
  );
};

export default CityInfo;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;

const CityWeather = React.memo(({ city }) => {
  const [weather, setWeather] = useState({ temperature: '', weatherDescription: '' });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric'
          }
        });

        if (response.data?.main) {
          const temperature = Math.round(response.data.main.temp);
          const weatherDescription = response.data.weather[0].description;
          setWeather({ temperature, weatherDescription });
        }
      } catch (error) {
        console.error(`Fout bij het ophalen van weer voor ${city}:`, error.response?.data || error.message);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div>
      <p><strong>Huidige weer:</strong> {weather.temperature}°C</p>
    </div>
  );
});

CityWeather.displayName = 'CityWeather';

export default CityWeather;
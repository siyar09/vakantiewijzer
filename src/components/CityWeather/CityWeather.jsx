import React, { useEffect, useState } from 'react';

const API_KEY = '385974b44bbc42e1758a483f6186cf8d';

const CityWeather = React.memo(({ city }) => {
  const [weather, setWeather] = useState({ temperature: '', weatherDescription: '' });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        if (data?.main) {
          const temperature = Math.round(data.main.temp);
          const weatherDescription = data.weather[0].description;
          setWeather({ temperature, weatherDescription });
        }
      } catch (error) {
        console.error(`Fout bij het ophalen van weer voor ${city}:`, error);
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

export default CityWeather;
import { useState, useEffect } from 'react';
import countries from '../data/Countries';
import { fetchExchangeRate, calculatePriceDifference } from '../components/BudgetCategory/BudgetCategory';
import { determineBestTravelTime } from '../components/BestTravelTime/BestTravelTime';

const WEATHER_API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;

const useCityData = () => {
  const [cityData, setCityData] = useState([]);
  const [filteredCityData, setFilteredCityData] = useState([]);
  const [error, setError] = useState(null);
  const [nlExchangeRate, setNlExchangeRate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ bestTime: '', budget: '' });
  const [sort, setSort] = useState('none');

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const fetchedData = [];
        const nlExchangeRate = await fetchExchangeRate('EUR');
        setNlExchangeRate(nlExchangeRate);

        for (let { city, country, countryCode, currencyCode } of countries) {
          try {
            // Fetch weather data
            const weatherResponse = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
            );
            const weatherData = await weatherResponse.json();
            
            // Get exchange rate
            const cityExchangeRate = await fetchExchangeRate(currencyCode);
            if (cityExchangeRate === null) continue;

            // Calculate temperature and determine best travel time
            const temperature = weatherData?.main?.temp ? Math.round(weatherData.main.temp) : null;
            const bestTravelTime = determineBestTravelTime(temperature);
            const budgetCategory = calculatePriceDifference(cityExchangeRate, nlExchangeRate);

            const cityInfo = {
              city,
              country,
              temperature,
              budget: budgetCategory,
              bestTravelTime,
              currentWeather: weatherData?.weather?.[0]?.description || "Onbekend",
              countryCode
            };

            fetchedData.push(cityInfo);
          } catch (error) {
            console.error(`Error fetching data for ${city}:`, error);
          }
        }

        setCityData(fetchedData);
        setFilteredCityData(fetchedData);
      } catch (error) {
        console.error('Fout bij het ophalen van de data:', error);
        setError('Er is een fout opgetreden bij het ophalen van de gegevens.');
      }
    };

    fetchCityData();
  }, []);

  useEffect(() => {
    let data = [...cityData];

    if (searchTerm) {
      data = data.filter(city =>
        city.city.toLowerCase().includes(searchTerm) ||
        city.country.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.bestTime) {
      data = data.filter(city => {
        const cityBestTime = determineBestTravelTime(city.temperature);
        return cityBestTime === filters.bestTime;
      });
    }

    if (filters.budget) {
      data = data.filter(city => city.budget.toLowerCase().includes(filters.budget.toLowerCase()));
    }

    if (sort === 'alphabetical') {
      data.sort((a, b) => a.city.localeCompare(b.city));
    }

    setFilteredCityData(data);
  }, [searchTerm, filters, sort, cityData]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm.toLowerCase());
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }));
  };

  const handleSortChange = (value) => {
    setSort(value);
  };

  const handleResetFilters = () => {
    setFilters({ bestTime: '', budget: '' });
    setSort('none');
    setSearchTerm('');
  };

  return {
    cityData,
    filteredCityData,
    error,
    searchTerm,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    handleResetFilters,
  };
};

export default useCityData;
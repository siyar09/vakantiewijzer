import { useState, useEffect } from 'react';
import countries from '../components/Countries/Countries';
import { fetchExchangeRate, calculatePriceDifference } from '../components/BudgetCategory/BudgetCategory';
import { determineBestTravelTime } from '../components/BestTravelTime/BestTravelTime';

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
          const cityExchangeRate = await fetchExchangeRate(currencyCode);
          if (cityExchangeRate === null) continue;

          const bestTravelTime = determineBestTravelTime();

          const budgetCategory = calculatePriceDifference(cityExchangeRate, nlExchangeRate);

          const cityInfo = {
            city,
            country,
            budget: budgetCategory,
            bestTravelTime,
            currentWeather: "4°C, broken clouds" // Voeg huidige weerinformatie toe
          };

          fetchedData.push(cityInfo);
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
      data = data.filter(city => city.bestTravelTime.toLowerCase() === filters.bestTime.toLowerCase());
    }

    if (filters.budget) {
      data = data.filter(city => city.budget.toLowerCase().includes(filters.budget.toLowerCase()));
    }

    if (sort === 'alphabetical') {
      data.sort((a, b) => a.city.localeCompare(b.city));
    }

    setFilteredCityData(data);
  }, [searchTerm, filters, sort, cityData]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
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
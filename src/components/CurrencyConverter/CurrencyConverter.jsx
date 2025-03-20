import React, { useEffect, useState } from 'react';
import axios from 'axios';
import countries from '../../data/Countries';
import './CurrencyConverter.css';

const CurrencyConverter = ({ city, country }) => {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currencyCode, setCurrencyCode] = useState('EUR');

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        // Haal de currencyCode op uit de Countries data
        const countryData = countries.find(c => c.city === city);
        if (!countryData) {
          throw new Error('Land niet gevonden');
        }
        
        setCurrencyCode(countryData.currencyCode);

        // Haal wisselkoers op van de Exchange Rates API
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/EUR`);
        
        if (response.data && response.data.rates[countryData.currencyCode]) {
          setExchangeRate(response.data.rates[countryData.currencyCode]);
        } else {
          throw new Error('Wisselkoers niet gevonden');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Fout bij ophalen wisselkoers:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, [city]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setAmount(value);
    }
  };

  const calculateExchange = () => {
    if (!exchangeRate) return 0;
    return (amount * exchangeRate).toFixed(2);
  };

  return (
    <div className='currency-converter'>
      <h2>Valutawisselaar</h2>
      <hr />
      {loading ? (
        <p>Wisselkoers laden...</p>
      ) : error ? (
        <p>Fout bij ophalen wisselkoers: {error}</p>
      ) : (
        <div className="converter-content">
          <div className="input-group">
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              min="0"
            />
            <span>EUR</span>
          </div>
          <p className="exchange-rate">
            1 EUR = {exchangeRate?.toFixed(2)} {currencyCode}
          </p>
          <div className="result">
            <strong>{calculateExchange()} {currencyCode}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
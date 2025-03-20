import React from 'react';
import axios from 'axios';

const fetchExchangeRate = async (currencyCode) => {
  try {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${currencyCode}`);
    return response.data?.rates?.EUR || null;
  } catch (error) {
    console.error(`Fout bij het ophalen van wisselkoers voor ${currencyCode}:`, error.response?.data || error.message);
    return null;
  }
};

const calculatePriceDifference = (cityExchangeRate, nlExchangeRate) => {
  if (nlExchangeRate === null) return 'Onbekend';
  const priceDifference = ((cityExchangeRate - nlExchangeRate) / nlExchangeRate) * 100;
  if (priceDifference <= -2) return 'Goedkoop 🟢';
  if (priceDifference >= 2) return 'Duur 🔴';
  return 'Gemiddeld 🟡';
};

const BudgetCategory = ({ budget }) => {
  return (
    <div> 
      <p><strong>Budget: </strong>{budget}</p>
    </div>
  );
};

export { fetchExchangeRate, calculatePriceDifference };
export default BudgetCategory;
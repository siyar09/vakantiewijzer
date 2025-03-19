import React, { useEffect, useState } from 'react';
import './Statistics.css';

const Statistics = () => {
  const [visitors, setVisitors] = useState(0);
  const [countries, setCountries] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors((prev) => (prev < 10000 ? prev + 250 : 10000));
      setCountries((prev) => (prev < 30 ? prev + 1 : 30));
      setTime((prev) => (prev < 3 ? prev + 0.1 : 3));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="statistics">
      <div className="stat-item">
        <h2 className="count">{Math.round(visitors)}</h2>
        <p>meer dan 10.000 bezoekers per maand</p>
      </div>
      <div className="stat-item">
        <h2 className="count">{Math.round(countries)}</h2>
        <p>meer dan 30+ landen beschikbaar</p>
      </div>
      <div className="stat-item">
        <h2 className="count">{time.toFixed(1)}</h2>
        <p>Gebruikers vinden binnen 3 minuten hun ideale bestemming</p>
      </div>
    </div>
  );
};

export default Statistics;
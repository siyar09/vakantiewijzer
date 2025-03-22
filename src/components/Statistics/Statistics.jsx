import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaGlobeEurope, FaClock } from 'react-icons/fa';
import './Statistics.css';

const Statistics = () => {
  const [stats, setStats] = useState({
    visitors: 0,
    countries: 0,
    time: 0
  });

  const statsData = [
    {
      icon: <FaUsers />,
      value: 10000,
      label: "meer dan 10.000 bezoekers per maand",
      suffix: "",
      key: "visitors"
    },
    {
      icon: <FaGlobeEurope />,
      value: 30,
      label: "meer dan 30+ landen beschikbaar",
      suffix: "+",
      key: "countries"
    },
    {
      icon: <FaClock />,
      value: 3,
      label: "Gebruikers vinden binnen 3 minuten hun ideale bestemming",
      suffix: "min",
      key: "time"
    }
  ];

  useEffect(() => {
    const duration = 2000; // 2 seconde
    const steps = 50;
    const interval = duration / steps;

    const incrementValues = statsData.map(stat => ({
      key: stat.key,
      increment: stat.value / steps
    }));

    const counter = setInterval(() => {
      setStats(prevStats => {
        const newStats = { ...prevStats };
        let allCompleted = true;

        incrementValues.forEach(({ key, increment }) => {
          if (newStats[key] < statsData.find(s => s.key === key).value) {
            newStats[key] = Math.min(
              newStats[key] + increment,
              statsData.find(s => s.key === key).value
            );
            allCompleted = false;
          }
        });

        if (allCompleted) {
          clearInterval(counter);
        }

        return newStats;
      });
    }, interval);

    return () => clearInterval(counter);
  }, []);

  return (
    <motion.div 
      className="statistics"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {statsData.map((stat, index) => (
        <motion.div 
          key={stat.key}
          className="stat-item"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <div className="stat-icon">{stat.icon}</div>
          <h2 className="count">
            {Math.round(stats[stat.key])}
            {stat.suffix}
          </h2>
          <p>{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Statistics;
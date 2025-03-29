import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import './CityActivities.css';

const CityActivities = ({ city }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_APP_OPENTRIP_API_KEY;
    const cancelToken = axios.CancelToken.source();

    const fetchActivities = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get de coordinaten voor de stad
        const geonameResponse = await axios.get(
          `https://api.opentripmap.com/0.1/en/places/geoname`, {
            params: {
              name: city,
              apikey: API_KEY
            },
            cancelToken: cancelToken.token
          }
        );

        const geonameData = geonameResponse.data;

        if (!geonameData?.lon || !geonameData?.lat) {
          throw new Error(`Geen coördinaten gevonden voor ${city}`);
        }

        // Get activiteiten volgens de coordinaten van de stad
        const activitiesResponse = await axios.get(
          `https://api.opentripmap.com/0.1/en/places/radius`, {
            params: {
              radius: 10000,
              lon: geonameData.lon,
              lat: geonameData.lat,
              apikey: API_KEY
            },
            cancelToken: cancelToken.token
          }
        );

        const activitiesData = activitiesResponse.data;

        if (!activitiesData?.features?.length) {
          throw new Error('Geen activiteiten gevonden');
        }

        const uniqueActivities = new Set();
        const topActivities = activitiesData.features
          .filter(item => item.properties.name && item.properties.rate > 1)
          .sort((a, b) => b.properties.rate - a.properties.rate)
          .filter(item => {
            if (!uniqueActivities.has(item.properties.name)) {
              uniqueActivities.add(item.properties.name);
              return true;
            }
            return false;
          })
          .slice(0, 5)
          .map(item => ({
            name: item.properties.name,
            rating: item.properties.rate
          }));

        setActivities(topActivities);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error('Error fetching activities:', err);
        setError(err.response?.data?.message || err.message || 'Er is een fout opgetreden');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();

    return () => cancelToken.cancel();
  }, [city]);


  return (
    <motion.div 
      className='city-activities'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Top activiteiten</h2>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            className="loading-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FaSpinner className="spinner" />
            <p>Activiteiten laden...</p>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            className="error-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FaExclamationTriangle className="error-icon" />
            <p>{error}</p>
          </motion.div>
        ) : (
          <motion.ul
            key="activities"
            className="activities-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {activities.map((activity, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="activity-name">{activity.name}</span>
                <div className="activity-rating">
                  {Array.from({ length: Math.round(activity.rating) }).map((_, i) => (
                    <span key={i} className="star">⭐</span>
                  ))}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CityActivities;
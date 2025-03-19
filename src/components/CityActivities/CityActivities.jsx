import React, { useEffect, useState } from 'react';

const CityActivities = ({ city }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const geonameResponse = await fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=5ae2e3f221c38a28845f05b6c29b94fa1a39d84c4599724707a819e9`);
        const geonameData = await geonameResponse.json();
        console.log('Geoname data:', geonameData);
        if (geonameData && geonameData.lon && geonameData.lat) {
          const activitiesResponse = await fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${geonameData.lon}&lat=${geonameData.lat}&apikey=5ae2e3f221c38a28845f05b6c29b94fa1a39d84c4599724707a819e9`);
          const activitiesData = await activitiesResponse.json();
          console.log('Activities data:', activitiesData);
          if (activitiesData && activitiesData.features) {
            const uniqueActivities = new Set();
            const topActivities = activitiesData.features
              .sort((a, b) => b.properties.rate - a.properties.rate)
              .filter(item => {
                if (!uniqueActivities.has(item.properties.name)) {
                  uniqueActivities.add(item.properties.name);
                  return true;
                }
                return false;
              })
              .slice(0, 5)
              .map(item => item.properties.name);
            setActivities(topActivities);
          } else {
            throw new Error('Geen activiteiten gevonden.');
          }
        } else {
          throw new Error(`Geen coördinaten gevonden voor ${city}.`);
        }
      } catch (error) {
        console.error('Fout bij ophalen activiteiten:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [city]);

  return (
    <div className='city-activities'>
      <h2>Top activiteiten</h2>
      <hr />
      {loading ? (
        <p>Laden van activiteiten...</p>
      ) : error ? (
        <p>Fout bij ophalen activiteiten: {error}</p>
      ) : activities.length > 0 ? (
        <ul>
          {activities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      ) : (
        <p>Geen activiteiten gevonden.</p>
      )}
    </div>
  );
};

export default CityActivities;
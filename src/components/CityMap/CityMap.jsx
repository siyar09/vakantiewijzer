import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

const OPENCAGE_API_KEY = import.meta.env.VITE_APP_OPENCAGE_API_KEY;

const CityMap = ({ city, country }) => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLocationCoordinates = async (query) => {
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
        params: {
          q: query,
          key: OPENCAGE_API_KEY,
          limit: 1
        }
      });

      if (response.data.results && response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        return { lat: parseFloat(lat), lon: parseFloat(lng) };
      }
      throw new Error(`Geen coördinaten gevonden voor ${query}`);
    } catch (error) {
      console.error('Fout bij ophalen coördinaten:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const locationCoords = await fetchLocationCoordinates(`${city}, ${country}`);
        setCoordinates(locationCoords);
        setError(null);
      } catch (error) {
        setError(`Kon de locatie niet vinden: ${city}, ${country}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoordinates();
  }, [city, country]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => degree * (Math.PI / 180);
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleCalculateDistance = async () => {
    if (!destination.trim()) {
      setDistance('Voer een bestemming in.');
      return;
    }

    try {
      const destCoords = await fetchLocationCoordinates(destination);
      const dist = calculateDistance(
        coordinates.lat,
        coordinates.lon,
        destCoords.lat,
        destCoords.lon
      );
      setDistance(Math.round(dist));
      setError(null);
    } catch (error) {
      setError('Fout bij het berekenen van de afstand.');
      setDistance(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCalculateDistance();
    }
  };

  if (isLoading) {
    return <div>Kaart laden...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className='city-map'>
      <h2>Kaart</h2>
      <hr />
      <MapContainer 
        center={[coordinates.lat, coordinates.lon]} 
        zoom={2} 
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[coordinates.lat, coordinates.lon]}>
          <Popup>
            {city}, {country}
          </Popup>
        </Marker>
      </MapContainer>
      <div className='distance-calculator'>
        <h3>Bereken de reisafstand naar je bestemming vanaf jouw locatie!</h3>
        <input
          type='text'
          placeholder='Voer uw woonplaats in'
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleCalculateDistance}>Bereken afstand</button>
        {distance && <p>De reis afstand is: {typeof distance === 'number' ? `${distance} km` : distance}</p>}
      </div>
    </div>
  );
};

export default CityMap;
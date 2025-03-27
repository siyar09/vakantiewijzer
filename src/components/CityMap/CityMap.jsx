import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

// Create custom axios instance for Nominatim
const nominatimApi = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
  params: {
    format: 'json'
  }
});

const CityMap = ({ city, country }) => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
  const [countryCoordinates, setCountryCoordinates] = useState({ lat: 0, lon: 0 });
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        // Get country coordinates
        const countryResponse = await axios.get(`https://restcountries.com/v3.1/name/${country}`, {
          params: {
            fields: 'latlng'
          }
        });

        if (countryResponse.data && countryResponse.data.length > 0 && countryResponse.data[0].latlng) {
          setCountryCoordinates({ 
            lat: countryResponse.data[0].latlng[0], 
            lon: countryResponse.data[0].latlng[1] 
          });
        }

        // Get city coordinates using Nominatim
        const cityResponse = await nominatimApi.get('/search', {
          params: {
            q: `${city}, ${country}`,
            limit: 1
          }
        });

        if (cityResponse.data && cityResponse.data.length > 0) {
          setCoordinates({
            lat: parseFloat(cityResponse.data[0].lat),
            lon: parseFloat(cityResponse.data[0].lon)
          });
        } else {
          throw new Error(`Geen coördinaten gevonden voor ${city}.`);
        }
      } catch (error) {
        console.error('Fout bij ophalen coördinaten:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Add delay to respect Nominatim usage policy
    const timeoutId = setTimeout(() => {
      fetchCoordinates();
    }, 1000);

    return () => clearTimeout(timeoutId);
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
      const response = await nominatimApi.get('/search', {
        params: {
          q: destination,
          limit: 1
        }
      });

      if (response.data && response.data.length > 0) {
        const destCoordinates = response.data[0];
        const dist = calculateDistance(
          coordinates.lat,
          coordinates.lon,
          parseFloat(destCoordinates.lat),
          parseFloat(destCoordinates.lon)
        );
        setDistance(Math.round(dist));
      } else {
        setDistance('Geen coördinaten gevonden voor de opgegeven locatie.');
      }
    } catch (error) {
      console.error('Fout bij het berekenen van de afstand:', error);
      setDistance('Fout bij het berekenen van de afstand.');
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

  return (
    <div className='city-map'>
      <h2>Kaart</h2>
      <hr />
      <MapContainer 
        center={[countryCoordinates.lat, countryCoordinates.lon]} 
        zoom={1.3} 
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
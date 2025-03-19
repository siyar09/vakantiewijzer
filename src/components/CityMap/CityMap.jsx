import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const CityMap = ({ city, country }) => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
  const [countryCoordinates, setCountryCoordinates] = useState({ lat: 0, lon: 0 });
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const countryResponse = await fetch(`https://restcountries.com/v3.1/name/${country}?fields=latlng`);
        const countryData = await countryResponse.json();
        if (countryData && countryData.length > 0 && countryData[0].latlng) {
          setCountryCoordinates({ lat: countryData[0].latlng[0], lon: countryData[0].latlng[1] });
        }

        const geonameResponse = await fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=5ae2e3f221c38a28845f05b6c29b94fa1a39d84c4599724707a819e9`);
        const geonameData = await geonameResponse.json();
        if (geonameData && geonameData.lon && geonameData.lat) {
          setCoordinates({ lat: geonameData.lat, lon: geonameData.lon });
        } else {
          throw new Error(`Geen coördinaten gevonden voor ${city}.`);
        }
      } catch (error) {
        console.error('Fout bij ophalen coördinaten:', error);
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
    return R * c; // Distance in kilometers
  };

  const handleCalculateDistance = async () => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${destination}&format=json&limit=1`);
      const data = await response.json();
      if (data.length > 0) {
        const destCoordinates = data[0];
        const dist = calculateDistance(coordinates.lat, coordinates.lon, parseFloat(destCoordinates.lat), parseFloat(destCoordinates.lon));
        setDistance(Math.round(dist)); // Rond de afstand af naar een geheel getal
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

  return (
    <div className='city-map'>
      <h2>Kaart</h2>
      <hr />
      <MapContainer center={[countryCoordinates.lat, countryCoordinates.lon]} zoom={1} style={{ height: '400px', width: '100%' }}>
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
        {distance && <p>De reis afstand is: {distance} km</p>}
      </div>
    </div>
  );
};

export default CityMap;
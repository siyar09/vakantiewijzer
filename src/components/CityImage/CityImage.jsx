import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CityImage.css';

const PIXABAY_API_KEY = import.meta.env.VITE_APP_PIXABAY_API_KEY;

const CityImage = React.memo(({ city, className }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchCityImage = async () => {
      try {
        const response = await axios.get('https://pixabay.com/api/', {
          params: {
            key: PIXABAY_API_KEY,
            q: `${city} landmark`,
            image_type: 'photo',
            per_page: 3
          }
        });
        
        setImageUrl(response.data?.hits?.[1]?.webformatURL || '');
      } catch (error) {
        console.error(`Fout bij het ophalen van afbeelding voor ${city}:`, error);
      }
    };

    fetchCityImage();
  }, [city]);

  return (
    <div>
      <img src={imageUrl} alt={city} className={className || 'city-image'} />
    </div>
  );
});

CityImage.displayName = 'CityImage';

export default CityImage;
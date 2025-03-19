import React, { useEffect, useState } from 'react';
import './CityImage.css';

const PIXABAY_API_KEY = '49266589-67ed3180b1e61f35d24a8b713';

const CityImage = React.memo(({ city, className }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchCityImage = async () => {
      try {
        const response = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${city}+landmark&image_type=photo&per_page=3`);
        const data = await response.json();
        setImageUrl(data?.hits?.[1]?.webformatURL || '');
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

export default CityImage;
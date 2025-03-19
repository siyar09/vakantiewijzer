import React, { useEffect, useState } from 'react';

const YELP_API_KEY = import.meta.env.VITE_APP_YELP_API_KEY;

const cache = {};

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <span className="star-rating">
      {'★'.repeat(fullStars)}
      {halfStar ? '☆' : ''}
      {'☆'.repeat(emptyStars)}
    </span>
  );
};

const CityReviews = React.memo(({ city, country }) => {
  const [reviews, setReviews] = useState({ rating: 0, review_count: 0 });

  useEffect(() => {
    let isMounted = true; // Voorkomt updates als de component wordt ontladen

    const fetchCityReviews = async () => {
      const cacheKey = `${city}-${country}`;
      if (cache[cacheKey]) {
        setReviews(cache[cacheKey]);
        return;
      }

      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wacht 1 seconde tussen verzoeken

        const response = await fetch(`https://api.yelp.com/v3/businesses/search?location=${country}`, {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`
          }
        });

        if (!isMounted) return; // Voorkomt state updates als de component unmount

        const data = await response.json();

        if (data?.businesses?.length > 0) {
          const { rating, review_count } = data.businesses[0];
          const reviewData = { rating, review_count };
          cache[cacheKey] = reviewData;
          setReviews(reviewData);
        } else {
          setReviews({ rating: 0, review_count: 0 });
        }
      } catch {
        if (isMounted) {
          setReviews({ rating: 0, review_count: 0 });
        }
      }
    };

    fetchCityReviews();

    return () => {
      isMounted = false;
    };
  }, [city, country]);

  return (
    <div>
      <p><strong>Beoordeling:</strong> {renderStars(reviews.rating)} ({reviews.review_count} beoordelingen)</p>
    </div>
  );
});

export default CityReviews;
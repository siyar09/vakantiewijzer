import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const CityFood = ({ city, nationality }) => {
  const [food, setFood] = useState([]);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const foodResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationality}`);
        if (foodResponse.data.meals) {
          const meals = foodResponse.data.meals.slice(0, 4).map(meal => ({
            name: meal.strMeal,
            image: meal.strMealThumb
          }));
          setFood(meals);
        } else {
          const fallbackFoodResponse = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
            params: {
              cuisine: nationality,
              apiKey: import.meta.env.VITE_APP_SPOONACULAR_API_KEY
            }
          });
          if (fallbackFoodResponse.data.results) {
            const meals = fallbackFoodResponse.data.results.slice(0, 4).map(meal => ({
              name: meal.title,
              image: meal.image
            }));
            setFood(meals);
          } else {
            setFood([{ name: 'Geen gerechten gevonden.', image: '' }]);
          }
        }
      } catch (error) {
        console.error('Fout bij ophalen eten & drinken:', error);
        setFood([{ name: 'Fout bij laden van gerechten.', image: '' }]);
      }
    };

    fetchFood();
  }, [nationality]);

  return (
    <div className='city-food'>
      <h2>Lokale gerechten</h2>
      <hr />
      {food.length > 0 ? (
        <ul>
          {food.map((meal, index) => (
            <li key={index}>
              <img src={meal.image} alt={meal.name} className='food-image' />
              {meal.name}
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>Laden van eten & drinken...</p>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};
export default CityFood;
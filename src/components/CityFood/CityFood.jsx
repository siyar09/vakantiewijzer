import React, { useEffect, useState } from 'react';

const CityFood = ({ city, nationality }) => {
  const [food, setFood] = useState([]);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const foodResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationality}`);
        const foodData = await foodResponse.json();
        if (foodData.meals) {
          const meals = foodData.meals.slice(0, 4).map(meal => ({
            name: meal.strMeal,
            image: meal.strMealThumb
          }));
          setFood(meals);
        } else {
          const fallbackFoodResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${nationality}&apiKey=ccd3266ae37043aba38bec7461cdd0ff`);
          const fallbackFoodData = await fallbackFoodResponse.json();
          if (fallbackFoodData.results) {
            const meals = fallbackFoodData.results.slice(0, 4).map(meal => ({
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
      }
    };

    fetchFood();
  }, [nationality]);

  return (
    <div className='city-food'>
      <h2>Eten & Drinken</h2>
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
        <p>Laden van eten & drinken...</p>
      )}
    </div>
  );
};

export default CityFood;
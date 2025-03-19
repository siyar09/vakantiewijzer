import React from 'react';

const reviews = [
  {
    name: 'Jan Jansen',
    rating: '⭐⭐⭐⭐⭐',
    review: 'VakantieWijzer maakte mijn trip naar {city} geweldig! De aanbevelingen waren perfect afgestemd op mijn voorkeuren. Heel gebruiksvriendelijk, ik raad het zeker aan!'
  },
  {
    name: 'Maria de Vries',
    rating: '⭐⭐⭐⭐',
    review: '{city} was fantastisch, en de website hielp me de verborgen juweeltjes van de stad te ontdekken. Had af en toe wat bugs, maar verder top!'
  },
  {
    name: 'Peter van Dijk',
    rating: '⭐⭐⭐⭐⭐',
    review: 'Met deze website ontdekte ik {city} op een unieke manier. Geweldige tips en alles was makkelijk te vinden. Zeker een aanrader!'
  },
  {
    name: 'Sophie de Boer',
    rating: '⭐⭐⭐⭐',
    review: 'De tips voor {city} waren erg nuttig en hebben mijn reiservaring verbeterd. Een paar kleine verbeterpunten, maar over het algemeen zeer tevreden!'
  },
  {
    name: 'Kees van der Meer',
    rating: '⭐⭐⭐⭐⭐',
    review: 'Fantastische ervaring met VakantieWijzer in {city}. De aanbevelingen waren spot-on en hebben mijn reis onvergetelijk gemaakt!'
  },
  {
    name: 'Laura Bakker',
    rating: '⭐⭐⭐⭐',
    review: 'Dankzij VakantieWijzer heb ik {city} op een geweldige manier kunnen verkennen. De tips waren erg nuttig!'
  },
  {
    name: 'Tom de Jong',
    rating: '⭐⭐⭐⭐⭐',
    review: 'Mijn reis naar {city} was fantastisch dankzij de aanbevelingen van VakantieWijzer. Zeer aan te raden!'
  },
  {
    name: 'Emma Visser',
    rating: '⭐⭐⭐⭐',
    review: 'VakantieWijzer heeft mijn reis naar {city} echt verbeterd. De aanbevelingen waren geweldig!'
  },
  {
    name: 'Lucas Smit',
    rating: '⭐⭐⭐⭐⭐',
    review: 'Geweldige ervaring met VakantieWijzer in {city}. De tips waren perfect en maakten mijn reis onvergetelijk!'
  },
  {
    name: 'Anna de Groot',
    rating: '⭐⭐⭐⭐',
    review: 'De aanbevelingen voor {city} waren erg nuttig. Een paar kleine verbeterpunten, maar over het algemeen zeer tevreden!'
  }
];

const getRandomReviews = (num) => {
  const shuffled = reviews.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const CityReviews = ({ city }) => {
  const randomReviews = getRandomReviews(3);

  return (
    <div className='reviews'>
      <h2>Reviews van mensen</h2>
      <hr />
      {randomReviews.map((review, index) => (
        <div className='review' key={index}>
          <p><strong>Naam:</strong> {review.name}</p>
          <p><strong>Beoordeling:</strong> {review.rating}</p>
          <p><strong>Review:</strong> {review.review.replace('{city}', city)}</p>
        </div>
      ))}
    </div>
  );
};

export default CityReviews;
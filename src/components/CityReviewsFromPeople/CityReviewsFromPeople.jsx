import React from 'react';

const reviews = [
  {
    name: 'Jan Jansen',
    rating: '⭐⭐⭐⭐⭐',
    review: 'VakantieWijzer maakte mijn reis naar {city} onvergetelijk! De tips waren precies wat ik zocht. Alles was perfect afgestemd op mijn voorkeuren. Ik ben enorm tevreden!'
  },
  {
    name: 'Maria de Vries',
    rating: '⭐⭐⭐⭐',
    review: 'Mijn trip naar {city} was fantastisch, vooral dankzij de website. De aanbevolen plekken waren geweldig, al waren er af en toe wat technische problemen.'
  },
  {
    name: 'Peter van Dijk',
    rating: '⭐⭐⭐⭐⭐',
    review: 'VakantieWijzer bracht mij naar verborgen pareltjes in {city}. Het was een geweldige ervaring, alles was zo makkelijk te vinden. Zeer handig en betrouwbaar!'
  },
  {
    name: 'Sophie de Boer',
    rating: '⭐⭐⭐⭐',
    review: 'De tips voor {city} waren waardevol en hebben mijn reis echt verrijkt. De website is gebruiksvriendelijk, al kan er nog wat verbetering komen in de snelheid.'
  },
  {
    name: 'Kees van der Meer',
    rating: '⭐⭐⭐⭐⭐',
    review: 'De ervaring met VakantieWijzer in {city} was top! De suggesties waren uitstekend en hebben mijn vakantie echt bijzonder gemaakt.'
  },
  {
    name: 'Laura Bakker',
    rating: '⭐⭐⭐⭐',
    review: 'Met VakantieWijzer ontdekte ik {city} op een nieuwe manier. De tips waren perfect, maar soms miste ik wat gedetailleerdere informatie.'
  },
  {
    name: 'Tom de Jong',
    rating: '⭐⭐⭐⭐⭐',
    review: 'Mijn reis naar {city} was geweldig dankzij de handige tips van VakantieWijzer. Het is echt een aanrader voor iedereen die op zoek is naar goede aanbevelingen!'
  },
  {
    name: 'Emma Visser',
    rating: '⭐⭐⭐⭐',
    review: 'VakantieWijzer gaf me de beste tips voor {city}. De website is praktisch, al kan de navigatie iets sneller. Maar verder ben ik erg tevreden!'
  },
  {
    name: 'Lucas Smit',
    rating: '⭐⭐⭐⭐⭐',
    review: 'VakantieWijzer in {city} was geweldig! De aanbevelingen waren precies wat ik nodig had en maakten mijn vakantie onvergetelijk. Heel erg blij met deze website!'
  },
  {
    name: 'Anna de Groot',
    rating: '⭐⭐⭐⭐',
    review: 'De website was handig voor mijn reis naar {city}. De tips waren erg goed, maar er zijn een paar dingen die ik zou verbeteren voor een nog betere ervaring.'
  },
  {
    name: 'Mark van der Meer',
    rating: '⭐⭐⭐⭐⭐',
    review: 'VakantieWijzer verbeterde mijn reis naar {city} enorm! De aanbevolen activiteiten waren perfect en ik heb zoveel meer gezien dan ik anders zou hebben gedaan.'
  },
  {
    name: 'Femke de Boer',
    rating: '⭐⭐⭐⭐',
    review: 'VakantieWijzer gaf me fantastische tips voor {city}. De ervaring was uitstekend, alleen het laden van de pagina’s kon soms wat sneller zijn.'
  },
  {
    name: 'Jasper Bakker',
    rating: '⭐⭐⭐⭐⭐',
    review: 'Mijn ervaring met VakantieWijzer in {city} was fantastisch! De suggesties waren precies wat ik nodig had en hebben mijn reis echt bijzonder gemaakt. Zeker een aanrader!'
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
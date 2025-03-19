import React from 'react';

const CityReviews = ({ city }) => {
  return (
    <div className='reviews'>
      <h2>Reviews van mensen</h2>
      <hr />
      <div className='review'>
        <p><strong>Naam:</strong> Jan Jansen</p>
        <p><strong>Beoordeling:</strong> ⭐⭐⭐⭐⭐</p>
        <p><strong>Review:</strong> VakantieWijzer maakte mijn trip naar {city} geweldig! De aanbevelingen waren perfect afgestemd op mijn voorkeuren. Heel gebruiksvriendelijk, ik raad het zeker aan!</p>
      </div>
      <div className='review'>
        <p><strong>Naam:</strong> Maria de Vries</p>
        <p><strong>Beoordeling:</strong> ⭐⭐⭐⭐</p>
        <p><strong>Review:</strong> {city} was fantastisch, en de website hielp me de verborgen juweeltjes van de stad te ontdekken. Had af en toe wat bugs, maar verder top!</p>
      </div>
      <div className='review'>
        <p><strong>Naam:</strong> Peter van Dijk</p>
        <p><strong>Beoordeling:</strong> ⭐⭐⭐⭐⭐</p>
        <p><strong>Review:</strong> Met deze website ontdekte ik {city} op een unieke manier. Geweldige tips en alles was makkelijk te vinden. Zeker een aanrader!</p>
      </div>
    </div>
  );
};

export default CityReviews;
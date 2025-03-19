import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ImageSection.css';

const ImageSection = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/keuzehulp');
  };

  return (
    <section className="image-section">
      <div className="text-content">
        <h2>Geen keuzestress meer!</h2>
        <h3>Wij weten precies waar jij heen moet</h3>
        <button className="image-button" onClick={handleButtonClick}>Klik en ontdek</button>
      </div>
      <div className="image-content">
        {/* De afbeelding wordt via CSS toegevoegd */}
      </div>
    </section>
  );
};

export default ImageSection;
import React, { useState, useEffect } from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  const [isTimedOut, setIsTimedOut] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsTimedOut(true);
    }, 10000); // 10 seconden

    return () => clearTimeout(timeoutId);
  }, []);

  if (isTimedOut) {
    return (
      <div className="timeout-message">
        Geen bestemmingen gevonden, probeer het later opnieuw
      </div>
    );
  }

  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
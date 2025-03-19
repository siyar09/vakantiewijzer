import React from 'react';
import './Popup.css';

const Popup = ({ type, message }) => {
  return (
    <div className={`popup ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default Popup;
import React from 'react';
import './PasswordStrength.css';

const PasswordStrength = ({ password }) => {
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '' };
    
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;

    switch (score) {
      case 0:
        return { score: 1, label: 'Zwak' };
      case 1:
        return { score: 2, label: 'Matig' };
      case 2:
        return { score: 3, label: 'Goed' };
      case 3:
        return { score: 4, label: 'Sterk' };
      default:
        return { score: 0, label: '' };
    }
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="password-strength">
      <div className="strength-bars">
        <div className={`strength-bar ${strength.score >= 1 ? 'weak' : ''}`}></div>
        <div className={`strength-bar ${strength.score >= 2 ? 'fair' : ''}`}></div>
        <div className={`strength-bar ${strength.score >= 3 ? 'good' : ''}`}></div>
        <div className={`strength-bar ${strength.score >= 4 ? 'strong' : ''}`}></div>
      </div>
      <span className="strength-label">{strength.label}</span>
    </div>
  );
};

export default PasswordStrength;
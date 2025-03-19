import React from 'react';

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}></div>
    </div>
  );
};

export default ProgressBar;
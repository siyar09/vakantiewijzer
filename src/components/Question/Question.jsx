import React from 'react';

const Question = ({ question, answers, selectedAnswer, onAnswerClick }) => {
  return (
    <>
      <h2>{question}</h2>
      <div className="answers">
        {answers.map((answer, index) => (
          <button
            key={index}
            className={`answer-button ${selectedAnswer === index ? 'selected' : ''}`}
            onClick={() => onAnswerClick(index)}
          >
            {answer}
          </button>
        ))}
      </div>
    </>
  );
};

export default Question;
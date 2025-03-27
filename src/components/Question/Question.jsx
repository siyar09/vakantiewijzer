import React from 'react';
import { motion } from 'framer-motion';
import './Question.css';

const Question = ({ question, answers, selectedAnswer, onAnswerClick }) => {
  return (
    <div className="question-container">
      <motion.h2 
        className="question-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {question}
      </motion.h2>
      
      <div className="answers-grid">
        {answers.map((answer, index) => (
          <motion.div
            key={index}
            className={`answer-option ${selectedAnswer === index ? 'selected' : ''}`}
            onClick={() => onAnswerClick(index)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <p className="answer-text">{answer}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Question;
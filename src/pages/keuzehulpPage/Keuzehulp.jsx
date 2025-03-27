import React, { useState, useEffect } from 'react';
import './Keuzehulp.css';
import countries from '../../data/Countries.js';
import descriptions from '../../data/descriptions.json';
import Modal from '../../components/Modal/Modal.jsx';
import Question from '../../components/Question/Question.jsx';
import ProgressBar from '../../components/ProgressBar/ProgressBar.jsx';
import Recommendation from '../../components/Recommendation/Recommendation.jsx';
import questions from '../../data/Questions.js';
import { fetchExchangeRate, calculatePriceDifference } from '../../components/BudgetCategory/BudgetCategory';
import { motion, AnimatePresence } from 'framer-motion';


const Keuzehulp = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
  };

  const handleNextClick = () => {
    if (selectedAnswer !== null) {
      setAnswers([...answers, selectedAnswer]);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  const handlePrevClick = () => {
    if (currentQuestion > 0) {
      setAnswers(answers.slice(0, -1));
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
    }
  };

  const getRecommendations = async () => {
    try {
      const nlExchangeRate = await fetchExchangeRate('EUR');
      
      const recommendationsPromises = countries.map(async country => {
        let score = 0;

        // Bereken score op basis van antwoorden
        if (answers[0] === 0 && country.temperature === 'Warm') score += 2;
        if (answers[0] === 1 && country.temperature === 'Gematigd') score += 2;
        if (answers[0] === 2 && country.temperature === 'Koel') score += 2;

        if (answers[1] === 0 && country.locationType === 'Binnen Nederland') score += 2;
        if (answers[1] === 1 && country.locationType === 'Binnen Europa') score += 2;
        if (answers[1] === 2 && country.locationType === 'Buiten Europa') score += 2;

        if (answers[3] === 0 && country.hasBeach === true) score += 2;
        if (answers[3] === 1 && country.hasBeach === false) score += 2;

        if (answers[4] === 0 && country.isBusy === false) score += 2;
        if (answers[4] === 1 && country.isBusy === true) score += 2;

        if (answers[5] === 0 && country.active === true) score += 2;
        if (answers[5] === 1 && country.active === false) score += 2;

        const cityExchangeRate = await fetchExchangeRate(country.currencyCode);
        const budget = calculatePriceDifference(cityExchangeRate, nlExchangeRate);
        const description = descriptions[country.city] || "Geen beschrijving beschikbaar.";

        return {
          ...country,
          score,
          currentWeather: "4°C, broken clouds",
          bestTravelTime: country.bestTravelTime,
          budget: budget,
          description
        };
      });

      const recommendations = await Promise.all(recommendationsPromises);
      recommendations.sort((a, b) => b.score - a.score);
      return recommendations.slice(0, 5);
    } catch (error) {
      console.error('Error calculating recommendations:', error);
      return [];
    }
  };

  const handleFinishClick = async () => {
    setShowModal(true);
    setIsLoading(true);
    
    try {
      // Voeg een minimale vertraging toe om de laadstatus te tonen
      await Promise.all([
        getRecommendations(),
        new Promise(resolve => setTimeout(resolve, 3000))
      ]).then(([recommendations]) => {
        setRecommendations(recommendations);
        setCurrentQuestion(questions.length);
      });
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  const handleStartClick = () => {
    setIsQuizStarted(true);
  };

    return (
      <div className="quiz-wrapper">
        <motion.div 
          className="quiz-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {showModal && (
            <Modal show={true} onClose={() => {}}>
              <motion.div 
                className="loading-container"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="loading-bar"></div>
                <div className="loading-text">Je perfecte bestemming zoeken...</div>
              </motion.div>
            </Modal>
          )}
          
          {!isQuizStarted ? (
            <motion.div 
              className="welcome-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1>Ontdek Jouw Perfecte Bestemming</h1>
              <p className="welcome-text">
                Beantwoord enkele vragen en wij vinden de beste bestemming voor jouw droomvakantie
              </p>
              <motion.button 
                className="start-button"
                onClick={handleStartClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start De Reis
              </motion.button>
            </motion.div>
          ) : (
            currentQuestion < questions.length ? (
              <motion.div 
                className="question-section"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="question-number">Vraag {currentQuestion + 1} van {questions.length}</span>
                <ProgressBar currentQuestion={currentQuestion} totalQuestions={questions.length} />
                <Question
                  question={questions[currentQuestion].question}
                  answers={questions[currentQuestion].answers}
                  selectedAnswer={selectedAnswer}
                  onAnswerClick={handleAnswerClick}
                />
                <motion.div 
                  className="navigation-buttons"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button 
                    className="prev-button"
                    onClick={handlePrevClick}
                    disabled={currentQuestion === 0}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ← Vorige
                  </motion.button>
                  {currentQuestion < questions.length - 1 ? (
                    <motion.button 
                      className="next-button"
                      onClick={handleNextClick}
                      disabled={selectedAnswer === null}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Volgende →
                    </motion.button>
                  ) : (
                    <motion.button 
                      className="finish-button"
                      onClick={handleFinishClick}
                      disabled={selectedAnswer === null}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ontdek Mijn Bestemming
                    </motion.button>
                  )}
                </motion.div>
              </motion.div>
            ) : (
              <Recommendation recommendations={recommendations} />
            )
          )}
        </motion.div>
      </div>
    );
  };
  
  export default Keuzehulp;
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

const Quiz = () => {
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

        // Calculate budget
        const cityExchangeRate = await fetchExchangeRate(country.currencyCode);
        const budget = calculatePriceDifference(cityExchangeRate, nlExchangeRate);

        const currentWeather = "4°C, broken clouds";
        const description = descriptions[country.city] || "Geen beschrijving beschikbaar.";

        return {
          ...country,
          score,
          currentWeather,
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
      const topRecommendations = await getRecommendations();
      setRecommendations(topRecommendations);
      setCurrentQuestion(questions.length);
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
    <div className="quiz-container">
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="loading-container">
          <div className="loading-bar"></div>
          <div className="loading-text">Antwoorden analyseren...</div>
        </div>
      </Modal>
      {!isQuizStarted && (
        <>
          <h1>Welkom bij de keuzehulp!</h1>
          <button className="start-button" onClick={handleStartClick}>
            Dit is het begin van jou vakantie!
          </button>
        </>
      )}
      {isQuizStarted && (
        currentQuestion < questions.length ? (
          <>
            <span className="question-number">{currentQuestion + 1}/{questions.length}</span>
            <ProgressBar currentQuestion={currentQuestion} totalQuestions={questions.length} />
            <Question
              question={questions[currentQuestion].question}
              answers={questions[currentQuestion].answers}
              selectedAnswer={selectedAnswer}
              onAnswerClick={handleAnswerClick}
            />
            <div className="navigation-buttons">
              <button className="prev" onClick={handlePrevClick} disabled={currentQuestion === 0}>
                ← Vorige
              </button>
              {currentQuestion < questions.length - 1 ? (
                <button className="next" onClick={handleNextClick} disabled={selectedAnswer === null}>
                  Volgende →
                </button>
              ) : (
                <button className="next" onClick={handleFinishClick} disabled={selectedAnswer === null}>
                  Voltooien
                </button>
              )}
            </div>
          </>
        ) : (
          isLoading ? (
            <div className="loading-container">
              <div className="loading-bar"></div>
              <div className="loading-text">Antwoorden analyseren...</div>
            </div>
          ) : (
            <Recommendation recommendations={recommendations} />
          )
        )
      )}
    </div>
  );
};

export default Quiz;
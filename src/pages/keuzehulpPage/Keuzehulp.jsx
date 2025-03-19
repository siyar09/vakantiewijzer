import React, { useState } from 'react';
import './Keuzehulp.css';
import countries from '../../data/Countries.js';
import descriptions from '../../data/descriptions.json';
import Modal from '../../components/Modal/Modal.jsx';
import Question from '../../components/Question/Question.jsx';
import ProgressBar from '../../components/ProgressBar/ProgressBar.jsx';
import Recommendation from '../../components/Recommendation/Recommendation.jsx';
import questions from '../../data/Questions.js';

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

  const getRecommendations = () => {
    const recommendations = countries.map(country => {
      let score = 0;

      if (answers[0] === 0 && country.temperature === 'Warm') score++;
      if (answers[0] === 1 && country.temperature === 'Gematigd') score++;
      if (answers[0] === 2 && country.temperature === 'Koel') score++;

      if (answers[1] === 0 && country.locationType === 'Binnen Nederland') score++;
      if (answers[1] === 1 && country.locationType === 'Binnen Europa') score++;
      if (answers[1] === 2 && country.locationType === 'Buiten Europa') score++;

      if (answers[3] === 0 && country.hasBeach === true) score++;
      if (answers[3] === 1 && country.hasBeach === false) score++;

      if (answers[4] === 0 && country.isBusy === false) score++;
      if (answers[4] === 1 && country.isBusy === true) score++;

      if (answers[5] === 0 && country.active === true) score++;
      if (answers[5] === 1 && country.active === false) score++;

      const currentWeather = "4°C, broken clouds";
      const description = descriptions[country.city] || "Geen beschrijving beschikbaar.";

      const recommendation = { ...country, score, currentWeather, bestTravelTime: country.bestTravelTime, budget: country.budget, description };
      console.log(recommendation); // Voeg deze regel toe om de aanbevelingen te loggen
      return recommendation;
    });

    recommendations.sort((a, b) => b.score - a.score);
    return recommendations.slice(0, 5);
  };

  const handleFinishClick = () => {
    setShowModal(true);
    setIsLoading(true);
    setTimeout(() => {
      const topRecommendations = getRecommendations();
      setRecommendations(topRecommendations);
      setCurrentQuestion(questions.length);
      setIsLoading(false);
      setShowModal(false);
    }, 3000);
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
          <button className="start-button" onClick={handleStartClick}>Dit is het begin van jou vakantie!</button>
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
              <button className="prev" onClick={handlePrevClick} disabled={currentQuestion === 0}>← Vorige</button>
              {currentQuestion < questions.length - 1 ? (
                <button className="next" onClick={handleNextClick} disabled={selectedAnswer === null}>Volgende →</button>
              ) : (
                <button className="next" onClick={handleFinishClick} disabled={selectedAnswer === null}>Voltooien</button>
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
import React, { useState, useEffect } from 'react';
import { mockQuestions } from './questions';
import QuestionList from './components/QuestionList';
import NavigationButtons from './components/NavigationButtons';
import Header from './components/Header';
import Results from './components/Results'; // Import Results component
import './App.css';

const questionsPerPage = 10;

function App() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>(Array(mockQuestions.length).fill(0));
  const [isNextPageDisabled, setIsNextPageDisabled] = useState<boolean>(true);
  const [showResults, setShowResults] = useState<boolean>(false); // State to control results display
  const [results, setResults] = useState<{ [key: string]: number }>({}); // State to store results

  const startIndex = currentPage * questionsPerPage;
  const currentQuestionsPage = mockQuestions.slice(startIndex, startIndex + questionsPerPage);
  const totalPages = Math.ceil(mockQuestions.length / questionsPerPage);
  const totalQuestions = mockQuestions.length;

  useEffect(() => {
    const currentPageAnswers = answers.slice(startIndex, startIndex + questionsPerPage);
    const allAnswered = currentPageAnswers.every(answer => answer !== 0);
    setIsNextPageDisabled(!allAnswered);
  }, [currentPage, answers, startIndex]);

  const handleAnswer = (questionIndex: number, optionValue: number) => {
    const absoluteQuestionIndex = startIndex + questionIndex;
    const newAnswers = [...answers];
    newAnswers[absoluteQuestionIndex] = optionValue;
    setAnswers(newAnswers);
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (!isNextPageDisabled) {
      if (currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      alert("Please answer all questions on this page before proceeding.");
    }
  };

  const calculateResults = () => {
    const traitScores: { [key: string]: number } = {};

    mockQuestions.forEach((question, index) => {
      const answer = answers[index];
      const trait = question.trait;

      // Initialize trait score if it doesn't exist
      if (!traitScores[trait]) {
        traitScores[trait] = 0;
      }

      // Calculate score based on answer (1-5 mapping to -2 to +2)
      const answerScore = answer - 3; // Converts 1-5 to -2 to +2
      traitScores[trait] += answerScore;
    });

    // Normalize scores to percentages
    const normalizedResults: { [key: string]: number } = {};
    for (const trait in traitScores) {
      const rawScore = traitScores[trait];
      const normalizedScore = ((rawScore + 20) / 40) * 100; // Normalize to 0-100%
      normalizedResults[trait] = normalizedScore;
    }

    return normalizedResults;
  };

  const handleSubmit = () => {
    if (!isNextPageDisabled) {
      const calculatedResults = calculateResults();
      setResults(calculatedResults); // Store results in state
      setShowResults(true); // Show results component

      // Optional: Log the raw responses (as before)
      const response = mockQuestions.map((question, index) => ({
        questionId: question.id,
        answer: answers[index],
        trait: question.trait,
      }));
      console.log("Final Responses:", response);
    } else {
      alert("Please answer all questions on this page before submitting.");
    }
  };

    return (
    <div className="container">
      <Header currentPage={currentPage} totalPages={totalPages} totalQuestions={totalQuestions} />
      {!showResults ? (
        <>
          <QuestionList
            questions={currentQuestionsPage}
            answers={answers.slice(startIndex, startIndex + questionsPerPage)}
            onAnswer={handleAnswer}
          />
          <NavigationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            isNextPageDisabled={isNextPageDisabled}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
            handleSubmit={handleSubmit}
          />
        </>
      ) : (
        <Results results={results} />
      )}
    </div>
  );
}

export default App;

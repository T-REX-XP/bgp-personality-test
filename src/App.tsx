import React, { useState, useEffect } from 'react';
import { mockQuestions } from './questions';
import QuestionList from './components/QuestionList';
import NavigationButtons from './components/NavigationButtons';
import Header from './components/Header';
import './App.css';

const questionsPerPage = 6;

function App() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>(Array(mockQuestions.length).fill(0));
  const [isNextPageDisabled, setIsNextPageDisabled] = useState<boolean>(true);

  const startIndex = currentPage * questionsPerPage;
  const currentQuestionsPage = mockQuestions.slice(startIndex, startIndex + questionsPerPage);
  const totalPages = Math.ceil(mockQuestions.length / questionsPerPage);

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

  const handleSubmit = () => {
    if (!isNextPageDisabled) {
      const response = mockQuestions.map((question, index) => ({
        questionId: question.id,
        answer: answers[index]
      }));
      console.log("Final Responses:", response);
      alert("Test submitted! Check console for responses.");
    } else {
      alert("Please answer all questions on this page before submitting.");
    }
  };

  return (
    <div className="container">
      <Header currentPage={currentPage} totalPages={totalPages} />
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
    </div>
  );
}

export default App;

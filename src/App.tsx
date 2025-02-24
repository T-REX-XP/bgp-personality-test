import * as React from 'react';
import { useState, useEffect } from 'react';
import { mockQuestions } from './questions';
import QuestionList from './components/QuestionList';
import NavigationButtons from './components/NavigationButtons';
import Header from './components/Header';
import Results from './components/Results';
import { mockOpenAIResponse } from './mockOpenAI';
import './App.css';

const questionsPerPage = 10;

function App() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>(Array(mockQuestions.length).fill(0));
  const [isNextPageDisabled, setIsNextPageDisabled] = useState<boolean>(true);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [results, setResults] = useState<{ [key: string]: number }>({});
  const [summary, setSummary] = useState<string>("");

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

      if (!traitScores[trait]) {
        traitScores[trait] = 0;
      }

      const answerScore = answer - 3;
      traitScores[trait] += answerScore;
    });

    const normalizedResults: { [key: string]: number } = {};
    for (const trait in traitScores) {
      const rawScore = traitScores[trait];
      const normalizedScore = ((rawScore + 20) / 40) * 100;
      normalizedResults[trait] = normalizedScore;
    }

    return normalizedResults;
  };

  const handleSubmit = () => {
    if (!isNextPageDisabled) {
      const calculatedResults = calculateResults();
      setResults(calculatedResults);
      setShowResults(true);

      const summaryText = mockOpenAIResponse(calculatedResults);
      setSummary(summaryText);

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

  const randomAnswer = () => {
    const newAnswers = [...answers];
    for (let i = startIndex; i < startIndex + questionsPerPage && i < mockQuestions.length; i++) {
      newAnswers[i] = Math.floor(Math.random() * 5) + 1;
    }
    setAnswers(newAnswers);
  };

    const resetTest = () => {
    setAnswers(Array(mockQuestions.length).fill(0));
    setShowResults(false);
    setCurrentPage(0);
    setSummary("");
  };

  return (
    <div className="container">
      <Header showResults={showResults} />
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
            randomAnswer={randomAnswer}
          />
        </>
      ) : (
        <Results results={results} summary={summary} onRetakeTest={resetTest} />
      )}
    </div>
  );
}

export default App;

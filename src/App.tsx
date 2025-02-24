import React, { useState, useEffect } from 'react';
import './index.css';

interface Option {
  id: number;
  text: string;
}

interface Question {
  id: number;
  textLeft: string;
  textRight: string;
  id: number;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    textLeft: 'I am often disorganized',
    textRight: 'I keep myself organized',
  },
  {
    id: 2,
    textLeft: 'I make decisions with my head',
    textRight: 'I make decisions with my heart',
  },
  {
    id: 3,
    textLeft: 'I like to try to innovate',
    textRight: 'I like to use trusted methods',
  },
  {
    id: 4,
    textLeft: 'I keep my thoughts to myself',
    textRight: 'I speak up',
  },
  {
    id: 5,
    textLeft: 'I seek attention from others',
    textRight: 'I avoid attention from others',
  },
  {
    id: 6,
    textLeft: 'I prefer to work alone',
    textRight: 'I prefer to work in a team',
  },
  {
    id: 7,
    textLeft: 'I dive right into things',
    textRight: 'I like to observe first',
  },
  {
    id: 8,
    textLeft: 'I follow a schedule',
    textRight: 'I go with the flow',
  },
  {
    id: 9,
    textLeft: 'I enjoy being spontaneous',
    textRight: 'I like to plan things out',
  },
  {
    id: 10,
    textLeft: 'I am very talkative',
    textRight: 'I am a good listener',
  },
  {
    id: 11,
    textLeft: 'I get easily distracted',
    textRight: 'I have great focus',
  },
  {
    id: 12,
    textLeft: 'I love large parties',
    textRight: 'I prefer small gatherings',
  },
  {
    id: 13,
    textLeft: 'I am very direct',
    textRight: 'I am very diplomatic',
  },
  {
    id: 14,
    textLeft: 'I am highly competitive',
    textRight: 'I avoid competitions',
  },
  {
    id: 15,
    textLeft: 'I am always prepared',
    textRight: 'I am comfortable winging it',
  },
  {
    id: 16,
    textLeft: 'I think about the future',
    textRight: 'I focus on the present',
  },
  {
    id: 17,
    textLeft: 'I love to be challenged',
    textRight: 'I prefer to take it easy',
  },
  {
    id: 18,
    textLeft: 'I am very traditional',
    textRight: 'I am very modern',
  },
  {
    id: 19,
    textLeft: 'I value efficiency',
    textRight: 'I value thoroughness',
  },
  {
    id: 20,
    textLeft: 'I am assertive',
    textRight: 'I am laid-back',
  },
];

const questionsPerPage = 6;

function App() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>(Array(mockQuestions.length).fill(0));
  const [isNextPageDisabled, setIsNextPageDisabled] = useState<boolean>(true);

  const startIndex = currentPage * questionsPerPage;
  const currentQuestionsPage = mockQuestions.slice(startIndex, startIndex + questionsPerPage);
  const totalPages = Math.ceil(mockQuestions.length / questionsPerPage);
  const isLastPage = currentPage === totalPages - 1;

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
    if (!isNextPageDisabled) { // Ensure all questions on the last page are answered
      const response = mockQuestions.map((question, index) => ({
        questionId: question.id,
        answer: answers[index]
      }));
      console.log("Final Responses:", response);
      alert("Test submitted! Check console for responses."); // Optional user feedback
    } else {
      alert("Please answer all questions on this page before submitting.");
    }
  };


  return (
    <div className="container">
      <div className="header-container">
        <h1>Personality Test</h1>
        <p className="page-indicator">Page {currentPage + 1} of {totalPages}</p>
      </div>
      <div className="questions-container">
        <p style={{ textAlign: 'center', color: '#7d7369', fontStyle: 'italic' }}>FROM EACH PAIR, CHOOSE THE PHRASE THAT DESCRIBES YOU BEST.</p>
        {currentQuestionsPage.map((question, index) => (
          <div key={question.id} className="question-pair">
            <div className="question-options">
              <span className="option-text left-option">{question.textLeft}</span>
              <div className="radio-options">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className="radio-label">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={value}
                      checked={answers[startIndex + index] === value}
                      onChange={() => handleAnswer(index, value)}
                    />
                  </label>
                ))}
              </div>
              <span className="option-text right-option">{question.textRight}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="navigation">
        <button
          className="nav-button prev-button"
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        {isLastPage ? (
          <button
            className="nav-button submit-button"
            onClick={handleSubmit}
            disabled={isNextPageDisabled}
          >
            Submit
          </button>
        ) : (
          <button
            className="nav-button next-button"
            onClick={goToNextPage}
            disabled={isNextPageDisabled}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default App;

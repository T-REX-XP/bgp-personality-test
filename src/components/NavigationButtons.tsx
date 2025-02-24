import React from 'react';
import './NavigationButtons.css'

interface NavigationButtonsProps {
  currentPage: number;
  totalPages: number;
  isNextPageDisabled: boolean;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  handleSubmit: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentPage,
  totalPages,
  isNextPageDisabled,
  goToPreviousPage,
  goToNextPage,
  handleSubmit,
}) => {
  return (
    <div className="navigation">
      <button
        className="nav-button prev-button"
        onClick={goToPreviousPage}
        disabled={currentPage === 0}
      >
        Previous
      </button>
      {currentPage === totalPages - 1 ? (
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
  );
};

export default NavigationButtons;

import React from 'react';
import './Header.css';

interface HeaderProps {
  currentPage: number;
  totalPages: number;
  totalQuestions: number; // Add totalQuestions prop
}

const Header: React.FC<HeaderProps> = ({ currentPage, totalPages, totalQuestions }) => {
  return (
    <div className="header-container">
      <h1>Personality Test</h1>
      <p className="page-indicator">
        Page {currentPage + 1} of {totalPages} ({totalQuestions} Questions)
      </p>
    </div>
  );
};

export default Header;

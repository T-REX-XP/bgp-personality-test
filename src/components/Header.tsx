import React from 'react';
import './Header.css';

interface HeaderProps {
  currentPage: number;
  totalPages: number;
}

const Header: React.FC<HeaderProps> = ({ currentPage, totalPages }) => {
  return (
    <div className="header-container">
      <h1>Personality Test</h1>
      <p className="page-indicator">Page {currentPage + 1} of {totalPages}</p>
    </div>
  );
};

export default Header;

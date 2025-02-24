import React from 'react';
import './Results.css';

interface ResultsProps {
  results: { [key: string]: number };
}

const Results: React.FC<ResultsProps> = ({ results }) => {
  return (
    <div className="results-container">
      <h2>Your Personality Test Results</h2>
      <ul>
        {Object.entries(results).map(([trait, percentage]) => (
          <li key={trait}>
            <strong>{trait}:</strong> {percentage.toFixed(2)}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;

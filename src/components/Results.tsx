import React from 'react';
import './Results.css';

interface ResultsProps {
  results: { [key: string]: number };
  summary: string;
  onRetakeTest: () => void; // Add onRetakeTest prop
}

const Results: React.FC<ResultsProps> = ({ results, summary, onRetakeTest }) => {
  const getCategory = (percentage: number): string => {
    if (percentage >= 75) return 'High';
    if (percentage >= 50) return 'Moderate';
    return 'Low';
  };

  const handleSaveResults = () => {
    // In a real application, this would save the results to a database or backend.
    alert('Results saved! (Simulated)');
  };

  return (
    <div className="results-container">
      <h2>Your Personality Test Results</h2>
      <div className="charts-container">
        {Object.entries(results).map(([trait, percentage]) => (
          <div key={trait} className="chart-item">
            <div
              className={`chart-bar ${trait.toLowerCase()}`}
              style={{ width: `${percentage}%` }}
            >
              <span className="chart-label">{trait}</span>
            </div>
            <div className='chart-percentage'>
              <span >{percentage.toFixed(2)}% ({getCategory(percentage)})</span>
            </div>

          </div>
        ))}
      </div>
      <h3>Summary</h3>
      <p>{summary}</p>

      <div className="results-buttons">
        <button className="save-button" onClick={handleSaveResults}>
          Save Results
        </button>
        <button className="retake-button" onClick={onRetakeTest}>
          Take Test Again
        </button>
      </div>
    </div>
  );
};

export default Results;

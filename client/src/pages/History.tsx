import React from 'react';
import PromptHistory from '../components/promptHistory';
import './css/history.css';

const History: React.FC = () => {
  return (
    <div className="page-container">
      <h2 className="page-header">Learning History</h2>
      <PromptHistory />
    </div>
  );
};

export default History;

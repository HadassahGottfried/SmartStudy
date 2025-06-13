import React from 'react';
import UserPromptHistory from '../components/promptHistory';
import './css/userHistory.css';

const UserHistory: React.FC = () => {
  return (
    <div className="page-container">
      <h2 className="page-header">User's Learning History</h2>
      <UserPromptHistory />
    </div>
  );
};

export default UserHistory;

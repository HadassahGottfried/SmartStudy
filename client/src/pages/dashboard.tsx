import React from 'react';
import { useNavigate } from 'react-router-dom';
import PromptForm from '../components/PromptForm';
import PromptHistory from '../components/PromptHistory';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>ברוכה הבאה לפלטפורמת הלמידה</h1>
      <button onClick={handleLogout}>התנתק</button>
      <PromptForm />
      <hr />
      <PromptHistory />
    </div>
  );
};

export default Dashboard;

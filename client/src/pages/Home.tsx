import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h2>Welcome to SmartStudy</h2>
      <button onClick={() => navigate('/register')}>Register</button>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
};

export default Home;

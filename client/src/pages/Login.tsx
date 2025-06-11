// pages/Login.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { login } from '../services/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (name: string, phone: string) => {
    try {
      await login({ name, phone });
      alert('התחברת בהצלחה!');
      navigate('/dashboard'); // ⬅ מעבר לדשבורד
    } catch (error) {
      console.error(error);
      alert('שגיאה בהתחברות');
    }
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/loginForm';
import { login } from '../services/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import './css/login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState('');

  const handleLogin = async (name: string, phone: string) => {
    try {
      const { token, user } = await login({ name, phone });
      dispatch(loginSuccess({ token, user }));
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setServerError('Login failed: User not found or invalid credentials.');
    }
  };

  return (
    <div className="page-container">
      <LoginForm onLogin={handleLogin} />
      {serverError && <p className="error-message">{serverError}</p>}
    </div>
  );
};

export default Login;

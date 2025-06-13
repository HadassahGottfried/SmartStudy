import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/registerForm';
import { register } from '../services/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import './css/register.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (name: string, phone: string) => {
    try {
      const { token, user } = await register({ name, phone });
      dispatch(loginSuccess({ token, user }));
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <div className="page-container">
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default Register;

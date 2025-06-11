// pages/Register.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegistrForm';
import { register } from '../services/auth';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = async (name: string, phone: string) => {
    try {
      await register({ name, phone });
      alert('נרשמת בהצלחה!');
      navigate('/dashboard'); // ⬅ מעבר לדשבורד
    } catch (error) {
      console.error(error);
      alert('שגיאה בהרשמה');
    }
  };

  return <RegisterForm onRegister={handleRegister} />;
};

export default Register;

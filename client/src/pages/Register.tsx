import React from 'react';
import RegisterForm from '../components/RegistrForm';
import { register } from '../services/auth';

const Register: React.FC = () => {
  const handleRegister = async (name: string, phone: string) => {
  try {
    const token = await register({ name, phone }); // ⬅ מחזיר ישר את הטוקן
    alert('נרשמת בהצלחה!');
    // ניווט לדף אחר אם צריך
  } catch (error) {
    console.error(error);
    alert('שגיאה בהרשמה');
  }
};


  return <RegisterForm onRegister={handleRegister} />;
};

export default Register;

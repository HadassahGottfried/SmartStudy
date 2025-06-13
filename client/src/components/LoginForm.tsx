import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/authForm.css';

interface Props {
  onLogin: (name: string, phone: string) => void;
}

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isPhoneValid = /^\d{10}$/.test(phone);
    if (!isPhoneValid) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    setError('');
    onLogin(name, phone);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      
      {error && <p className="error-message">{error}</p>}
      <div className="register-wrapper">
        <p className="register-text">Don't have an account yet?</p>
        <button
          type="button"
          className="register-button"
          onClick={() => navigate('/register')}
        >
          Register
        </button>
      </div>


    </form>
  );
};

export default LoginForm;

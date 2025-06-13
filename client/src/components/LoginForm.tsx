import React, { useState } from 'react';
import './css/authForm.css';

interface Props {
  onLogin: (name: string, phone: string) => void;
}

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const isPhoneValid = /^\d{10}$/.test(phone);
  if (!isPhoneValid) {
    alert('Please enter a valid 10-digit phone number.');
    return;
  }

  onLogin(name, phone);
};

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
  <h2>Login</h2>

  <div className="form-group">
    <label>Name:</label>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />
  </div>

  <div className="form-group">
    <label>Phone:</label>
    <input
      type="text"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      required
    />
  </div>

  <button type="submit">Login</button>
</form>

  );
};

export default LoginForm;

// src/components/LoginForm.tsx
import React, { useState } from 'react';

interface Props {
  onLogin: (name: string, phone: string) => void;
}

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(name, phone);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>התחברות</h2>
      <div>
        <label>שם:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>טלפון:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <button type="submit">התחבר</button>
    </form>
  );
};

export default LoginForm;

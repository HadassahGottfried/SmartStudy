import React, { useState } from 'react';

interface Props {
  onRegister: (name: string, phone: string) => void;
}

const RegisterForm: React.FC<Props> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(name, phone);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>הרשמה</h2>
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
      <button type="submit">הירשם</button>
    </form>
  );
};

export default RegisterForm;

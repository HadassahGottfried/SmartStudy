import React, { useEffect, useState } from 'react';
import { getMyPrompts } from '../services/prompt';

const PromptHistory: React.FC = () => {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    getMyPrompts().then(setPrompts);
  }, []);

  return (
    <div>
      <h2>היסטוריית למידה</h2>
      {prompts.map((p: any) => (
        <div key={p.id} style={{ marginBottom: '20px' }}>
          <strong>שאלה:</strong> {p.prompt}<br />
          <strong>תשובה:</strong> {p.response}<br />
          <em>{new Date(p.created_at).toLocaleString()}</em>
        </div>
      ))}
    </div>
  );
};

export default PromptHistory;

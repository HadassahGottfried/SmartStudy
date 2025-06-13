import React, { useEffect, useState } from 'react';
import { getMyPrompts } from '../services/prompt';
import ReactMarkdown from 'react-markdown';
import './css/promptForm.css'

const PromptHistory: React.FC = () => {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    getMyPrompts().then(setPrompts);
  }, []);

  return (
    <div className="prompt-history-container">
      {prompts.map((p: any) => (
                <div key={p.id} className="prompt-card">

          <p><strong>📂 Category:</strong> {p.category?.name}</p>
          <p><strong>📁 Sub-category:</strong> {p.sub_category?.name}</p>
          <p><strong>📝 Prompt:</strong> {p.prompt}</p>
          <div>
            <strong>📚 Losson:</strong>
            <ReactMarkdown>{p.response}</ReactMarkdown>
          </div>
          <p className="timestamp">
            🕒 {new Date(p.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PromptHistory;

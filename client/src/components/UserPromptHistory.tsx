import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { getMyPrompts, getPromptsByUserId } from '../services/prompt';
import './css/userPromptHistory.css';
import axiosInstance from '../services/axiosInstance';

const UnifiedPromptHistory: React.FC = () => {
  const { userId } = useParams();
  const [prompts, setPrompts] = useState<any[]>([]);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
  if (userId) {
    getPromptsByUserId(userId).then(setPrompts);
    axiosInstance.get(`/users/${userId}`).then((res) => {
      setUserName(res.data.name);
    });
  } else {
    getMyPrompts().then(setPrompts);
  }
}, [userId]);

  return (
    <div className="prompt-history-container">
      {userId && userName && (
  <h3 className="user-history-header">
    Viewing history of: <strong>{userName}</strong>
  </h3>
)}

      <h2>Learning History</h2>
      {prompts.length === 0 ? (
        <p>No prompts found.</p>
      ) : (
        prompts.map((p) => (
          <div key={p.id} className="prompt-card">
            <p><strong>📂 Category:</strong> {p.category?.name}</p>
            <p><strong>📁 Subcategory:</strong> {p.sub_category?.name}</p>
            <p><strong>📝 Prompt:</strong> {p.prompt}</p>
            <div>
              <strong>📚 Lesson:</strong>
              <ReactMarkdown>{p.response}</ReactMarkdown>
            </div>
            <p className="timestamp">
              🕒 {new Date(p.created_at).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default UnifiedPromptHistory;

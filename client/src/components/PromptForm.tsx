import React, { useEffect, useState } from 'react';
import { getCategories, getSubCategories, createPrompt } from '../services/prompt';

const PromptForm: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    getCategories().then(setCategories);    
    getSubCategories().then(setSubCategories);
  }, []);

  const handleSubmit = async () => {
    if (!prompt || !categoryId || !subCategoryId) {
      alert('נא למלא את כל השדות');
      return;
    }

    const result = await createPrompt({ prompt, category_id: categoryId, sub_category_id: subCategoryId });
    setResponse(result.response);
  };

  return (
    <div>
      <h2>שיעור חדש</h2>

      <select onChange={(e) => setCategoryId(Number(e.target.value))} defaultValue="">
        <option value="" disabled>בחר קטגוריה</option>
        {categories.map((cat: any) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <select onChange={(e) => setSubCategoryId(Number(e.target.value))} defaultValue="">
        <option value="" disabled>בחר תת־קטגוריה</option>
        {subCategories.map((sub: any) => (
          <option key={sub.id} value={sub.id}>{sub.name}</option>
        ))}
      </select>

      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="מה את רוצה ללמוד?" />

      <button onClick={handleSubmit}>שלח</button>

      {response && (
        <div>
          <h3>תשובת ה-AI:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default PromptForm;

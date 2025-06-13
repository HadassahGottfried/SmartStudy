import React, { useEffect, useState } from 'react';
import { createPrompt, getCategories, getSubCategories } from '../services/prompt';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import ReactMarkdown from 'react-markdown';
import './css/promptForm.css';

const PromptForm: React.FC = () => {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (categoryId !== null) {
      getSubCategories(categoryId).then(setSubCategories);
      setSubCategoryId(null);
    } else {
      setSubCategories([]);
    }
  }, [categoryId]);

  const handleSubmit = async () => {
    if (!prompt || !categoryId || !subCategoryId) {
      setError('אנא מלאי את כל השדות');
      return;
    }

    setIsLoading(true);
    setResponse('');
    setError('');

    try {
      const result = await createPrompt({
        prompt,
        category_id: categoryId,
        sub_category_id: subCategoryId,
      });

      setResponse(result.response);
    } catch (err) {
      setError('ארעה שגיאה בעת יצירת השיעור');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = prompt && categoryId && subCategoryId;

  return (
    <div className="prompt-form">
      <h2>New Lesson</h2>

      <div>
        <label>Category:</label>
        <select
          value={categoryId ?? ''}
          onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Subcategory:</label>
        <select
          value={subCategoryId ?? ''}
          onChange={(e) => setSubCategoryId(e.target.value ? Number(e.target.value) : null)}
          disabled={!categoryId}
        >
          <option value="">Select subcategory</option>
          {subCategories.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>What would you like to learn?</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Explain black holes"
        />
      </div>

      <button onClick={handleSubmit} disabled={!isFormValid || isLoading}>
        Submit
      </button>

      {error && <p className="error-message">{error}</p>}

      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Generating your lesson...</p>
        </div>
      )}

      {!isLoading && response && (
        <div className="response-box">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default PromptForm;

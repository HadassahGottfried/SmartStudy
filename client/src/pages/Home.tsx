import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>ברוכים הבאים ל-SmartStudy</h2>
      <button onClick={() => navigate('/register')}>להירשם</button>
      <button onClick={() => navigate('/login')} style={{ marginRight: '10px' }}>להתחבר</button>
    </div>
  );
}

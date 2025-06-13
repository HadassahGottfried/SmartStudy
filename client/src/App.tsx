import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import History from './pages/history';
import Home from './pages/home';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import UserHistory from './pages/userHistory';

function App() {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            token ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/history"
          element={
            token ? <History /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/user-history/:userId" element={<UserHistory />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import History from './pages/History';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import UserHistory from './pages/UserHistory';


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

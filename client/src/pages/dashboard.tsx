import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { RootState } from '../app/store';
import axiosInstance from '../services/axiosInstance';
import './css/dashboard.css';
import PromptForm from '../components/promptForm';

interface User {
  id: string;
  name: string;
  phone: string;
  isAdmin?: boolean;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 const [searchTerm, setSearchTerm] = useState('');
const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

useEffect(() => {
  if (user?.isAdmin) {
    axiosInstance.get('/users').then((res) => {
      const usersWithoutAdmin = res.data.filter((u: User) => u.id !== user.id);
      setUsers(usersWithoutAdmin);
      setFilteredUsers(usersWithoutAdmin);
    });
  }
}, [user]);

useEffect(() => {
  if (!user?.isAdmin) return;

  if (searchTerm.trim() === '') {
    setFilteredUsers(users);
  } else {
    axiosInstance
      .get(`/users/search/name?name=${searchTerm}`)
      .then((res) => {
        const filtered = res.data.filter((u: User) => u.id !== user.id); // לא כולל את המנהל
        setFilteredUsers(filtered);
      })
      .catch(() => setFilteredUsers([]));
  }
}, [searchTerm, users]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleUserClick = (userId: string) => {
    navigate(`/user-history/${userId}`);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to the Learning Platform</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      {!user?.isAdmin && (
        <div className="prompt-form-container">
          <PromptForm />
        </div>
      )}
      {user?.isAdmin && (
  <>
    <h2>Registered Users</h2>

    <input
  type="text"
  placeholder="Search by name..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="user-search-input"
/>

    <ul className="user-list">
  {filteredUsers.map((u) => (
    <li key={u.id} onClick={() => handleUserClick(u.id)}>
      <strong>{u.name}</strong> - {u.phone}
    </li>
  ))}
</ul>
  </>
)}

    </div>
  );
};

export default Dashboard;

import axiosInstance from './axiosInstance';
import { jwtDecode } from 'jwt-decode';

interface DecodedUser {
  id: string;
  name: string;
  phone: string;
  isAdmin?: boolean;
}

export async function login(data: { name: string; phone: string }) {
  const response = await axiosInstance.post('/auth/login', data);
  const token = response.data.token;

  const user: DecodedUser = jwtDecode(token); // ✅ עובד בכל מצב

  return { token, user };
}

export async function register(data: { name: string; phone: string }) {
  const response = await axiosInstance.post('/auth/register', data);
  const token = response.data.token;

  const user: DecodedUser = jwtDecode(token);

  return { token, user };
}

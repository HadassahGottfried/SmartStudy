import axiosInstance from './axiosInstance';

export async function register(data: { name: string; phone: string }) {
  const response = await axiosInstance.post('/auth/register', data);
  const token = response.data.token;
  localStorage.setItem('token', token);
  return token;
}

export async function login(data: { name: string; phone: string }) {
  const response = await axiosInstance.post('/auth/login', data);
  const token = response.data.token;
  localStorage.setItem('token', token);
  return token;
}

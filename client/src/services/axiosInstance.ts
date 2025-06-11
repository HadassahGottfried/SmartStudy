import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token && config.headers) {
      // שימוש נכון עם טיפוס AxiosHeaders
      (config.headers as any).Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

import axios from 'axios';

// Так как бэкенд теперь отдает фронтенд, мы можем использовать относительный путь.
// Браузер автоматически подставит нужный домен (например, ваш адрес ngrok).
// Вам больше НЕ НУЖНО менять эту строку!
const API_BASE_URL = '/api';


const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Перехватчик для добавления токена авторизации в каждый запрос
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data; // { user, token }
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (name, email, password) => {
    try {
        const response = await apiClient.post('/auth/register', { name, email, password });
        return response.data; // { user, token }
    } catch (error) {
        throw error.response.data;
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await apiClient.get('/auth/me');
        return response.data; // user
    } catch (error) {
        throw error.response.data;
    }
};

export const notifyWithdrawal = async (data: { amount: string, address: string }) => {
    try {
        const response = await apiClient.post('/notifications/withdraw', data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

// Interceptor de salida: Inyecta el token dinámicamente
api.interceptors.request.use((config) => {
  // Puedes obtener el estado de Zustand fuera de los componentes usando getState()
  const token = useAuthStore.getState().token;
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de entrada: Si el token expira (Error 401), desloguea automáticamente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
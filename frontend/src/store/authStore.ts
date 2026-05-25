import { create } from 'zustand';
import { persist } from 'zustand/middleware';


// 1. Definir la estructura del usuario
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager'; // Roles comunes en un ERP
}

// 2. Definir el estado y las acciones del Store
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: localStorage.getItem('token'),
      isAuthenticated: !!localStorage.getItem('token'),

      setToken: (token) => {
        localStorage.setItem('token', token);
        set({ token });
      },

      fetchUser: async () => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const response = await fetch('/api/v1/auth/perfil', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log('Respuesta del perfil:', response);
            if (response.ok) {
              const userData = await response.json();
              set({ user: userData, isAuthenticated: true });
            } else {
              set({ user: null, token: null, isAuthenticated: false });
            }
          } catch (error) {
            console.error('Error fetching user:', error);
            set({ user: null, token: null, isAuthenticated: false });
          }
        } else {
          set({ user: null, token: null, isAuthenticated: false });
        }
      },

      // Acción para iniciar sesión
      login: (user, token) => {
        localStorage.setItem('token', token); // Guarda el token en localStorage
        set({ user, token, isAuthenticated: true });
      },

      // Acción para cerrar sesión y limpiar datos
      logout: () => {
        localStorage.removeItem('token'); // Limpia el token del localStorage
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'penta-auth-storage', // Nombre de la llave en el localStorage
    }
  )
);
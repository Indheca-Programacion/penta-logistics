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
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      // Acción para iniciar sesión
      login: (user, token) => {
        set({ user, token, isAuthenticated: true });
      },

      // Acción para cerrar sesión y limpiar datos
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'penta-auth-storage', // Nombre de la llave en el localStorage
    }
  )
);
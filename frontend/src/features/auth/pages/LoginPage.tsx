import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';
import { loginSchema, LoginFormData } from '../schemas/loginSchema';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/config/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const loginGlobal = useAuthStore((state) => state.login);
  
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Configuración de React Hook Form con la validación de Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Función que se ejecuta al enviar el formulario
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      // Conexión real con tu backend
      const response = await api.post('/auth/login', data); 
      
      // Desestructuramos lo que responda tu API (ajusta según tu backend)
      const { user, token } = response.data;

      // Guardamos en el estado global de Zustand
      loginGlobal(user, token);
      
      // Redirigimos al dashboard principal
      navigate('/');
    } catch (error: any) {
      // Captura de errores del backend (Credenciales incorrectas, etc.)
      const message = error.response?.data?.message || 'Ocurrió un error al iniciar sesión';
      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        
        {/* Encabezado */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            PENTA <span className="text-indigo-600">ERP</span>
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Ingresa tus credenciales para acceder al sistema
          </p>
        </div>

        {/* Alerta de error del Backend */}
        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-center">
            {apiError}
          </div>
        )}

        {/* Formulario */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            
            {/* Campo Correo Electrónico */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg bg-slate-50 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm ${
                    errors.email ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-500'
                  }`}
                  placeholder="usuario@empresa.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Campo Contraseña */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className={`block w-full pl-10 pr-10 py-2.5 border rounded-lg bg-slate-50 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm ${
                    errors.password ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-500'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>

          {/* Botón de Envío */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
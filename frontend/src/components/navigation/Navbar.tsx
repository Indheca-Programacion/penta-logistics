import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, ChevronDown, Shield } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export function Navbar() {
  const navigate = useNavigate();
  
  // 1. Traemos el usuario desde el store y la acción para obtenerlo y para logout
  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const logoutGlobal = useAuthStore((state) => state.logout);

  // 2. Estados y referencias para controlar el Dropdown
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 3. Efecto para cerrar el menú si se hace click fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 4. Función para manejar el cierre de sesión
  const handleLogout = () => {
    logoutGlobal(); // Limpia localStorage y reinicia el estado de Zustand
    navigate('/login'); // Redirige de inmediato a la pantalla de acceso
  };

  // 5. Al montar el componente, solicitamos los datos del usuario si no existen
  // useEffect(() => {
  //   if (!user) {
  //     fetchUser();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <header className="h-16 bg-brand-surface border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
      
      {/* Sección Izquierda: Identificación de la Empresa */}
      <div className="text-sm text-slate-500 font-medium">
        Empresa: <span className="text-brand-text font-semibold">Grupo Penta Corp</span>
      </div>

      {/* Sección Derecha: Notificaciones + Perfil con Dropdown */}
      <div className="flex items-center space-x-4">
        
        {/* Botón Notificaciones */}
        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        
        {/* CONTENEDOR DEL DROPDOWN (Usa la referencia del useRef) */}
        <div className="relative border-l pl-4 border-slate-200" ref={dropdownRef}>
          
          {/* Botón del Perfil que dispara el menú */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none"
          >
            <div className="bg-indigo-100 p-2 rounded-full text-brand-secondary">
              <User className="h-4 w-4" />
            </div>
            
            <div className="hidden md:block text-left">
              {/* Mostramos el nombre dinámico desde tu backend si existe */}
              <p className="text-sm font-medium text-slate-700 leading-none">
                {user?.name || 'Usuario del Sistema'}
              </p>
              <p className="text-xs text-slate-400 mt-1 capitalize">
                {user?.role || 'Operador'}
              </p>
            </div>

            <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* MENÚ DESPLEGABLE (Se renderiza condicionalmente) */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-slate-200 shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
              
              {/* Encabezado informativo dentro del menú */}
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-xs text-slate-400 font-medium">Conectado como</p>
                <p className="text-sm font-semibold text-slate-800 truncate">{user?.email}</p>
              </div>

              {/* Opción intermedia (ejemplo: Mi Perfil / Configuración) */}
              <button 
                onClick={() => { setIsOpen(false); navigate('/configuracion'); }}
                className="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
              >
                <Shield className="h-4 w-4 text-slate-400" />
                <span>Seguridad y Perfil</span>
              </button>

              <hr className="border-slate-100" />

              {/* Botón de Cierre de Sesión */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-left font-medium"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar sesión</span>
              </button>

            </div>
          )}

        </div>
      </div>
    </header>
  );
}
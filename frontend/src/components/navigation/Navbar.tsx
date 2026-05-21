import { Bell, User } from 'lucide-react';

export function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Título de la sección o buscador global */}
      <div className="text-sm text-slate-500 font-medium">
        Empresa: <span className="text-slate-800 font-semibold">Logística Corp</span>
      </div>

      {/* Acciones de Usuario */}
      <div className="flex items-center space-x-4">
        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        
        <div className="flex items-center space-x-3 border-l pl-4 border-slate-200">
          <div className="bg-indigo-100 p-2 rounded-full text-indigo-600">
            <User className="h-4 w-4" />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-slate-700 leading-none">Usuario Demo</p>
            <p className="text-xs text-slate-400 mt-1">Administrador</p>
          </div>
        </div>
      </div>
    </header>
  );
}
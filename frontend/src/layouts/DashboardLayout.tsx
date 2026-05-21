import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/navigation/Sidebar';
import { Navbar } from '@/components/navigation/Navbar';

export default function DashboardLayout() {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Barra Lateral Fija */}
      <Sidebar />

      {/* Contenedor del contenido principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        {/* Zona de contenido dinámico */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/navigation/Sidebar';
import { Navbar } from '@/components/navigation/Navbar';

export default function DashboardLayout() {
  return (
    // bg-brand-background aplica el fondo grisáceo/azul claro que configuramos
    <div className="flex h-screen w-screen overflow-hidden bg-brand-background text-brand-text">
      
      {/* 1. BARRA LATERAL (Fija a la izquierda) */}
      <Sidebar />

      {/* CONTENEDOR DERECHO (Navbar + Contenido) */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* 2. BARRA SUPERIOR (Fija arriba) */}
        <Navbar />

        {/* 3. ZONA DE CONTENIDO DINÁMICO (Con scroll independiente) */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* max-w-7xl limita el ancho en pantallas ultra anchas para no deformar las tablas */}
          <div className="mx-auto max-w-7xl space-y-6">
            
            {/* Aquí es donde React Router inyectará las pantallas de tus módulos */}
            <Outlet />
            
          </div>
        </main>
        
      </div>
    </div>
  );
}
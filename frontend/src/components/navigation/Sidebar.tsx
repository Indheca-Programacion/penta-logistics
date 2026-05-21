import {
  ClipboardList,
  FileCheck,
  FileText,
  LayoutDashboard,
  Truck,
  UserCog,
  Users,
} from 'lucide-react';

export function Sidebar() {
  // En el futuro, estos enlaces pueden filtrarse por los roles del usuario (RBAC)
  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { title: 'Traslados', icon: Truck, path: '/traslado' },
    { title: 'Requisiciones', icon: ClipboardList, path: '/requisiciones' },
    { title: 'Comprobaciones', icon: FileCheck, path: '/comprobaciones' },
    { title: 'Facturas', icon: FileText, path: '/facturas' },
    { title: 'Usuarios', icon: Users, path: '/usuarios' },
    { title: 'Personal Operativo', icon: UserCog, path: '/personal-operativo' },
    { title: 'Unidades', icon: Truck, path: '/unidades' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 min-h-screen flex flex-col border-r border-slate-800">
      {/* Logo / Nombre del ERP */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <span className="text-xl font-bold tracking-wider text-indigo-400">PENTA Logistics</span>
      </div>

      {/* Menú de Navegación */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.title}
              href={item.path}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Icon className="h-5 w-5 text-indigo-400" />
              <span className="text-sm font-medium">{item.title}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
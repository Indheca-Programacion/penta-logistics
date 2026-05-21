import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import LoginPage from '@/features/auth/pages/LoginPage';

// Componentes de prueba
const MockDashboard = () => <h1 className="text-2xl font-bold">Dashboard del ERP</h1>;
const MockInventory = () => <h1 className="text-2xl font-bold">Inventario</h1>;

<Route path="/login" element={<LoginPage />} />

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas Protegidas del ERP */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<MockDashboard />} />
            <Route path="inventario" element={<MockInventory />} />
          </Route>
        </Route>

        {/* Redirección por defecto si la ruta no existe */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
import Button from "~/components/atoms/Admin/Button";
import { useNavigate } from "react-router-dom";

export default function HeaderAdmin({ onLogoutClick }: { onLogoutClick: () => void }) {
  const navigate = useNavigate();

  
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex flex-col gap-1">
        <p className="text-3xl font-bold text-gray-900">Panel de Administración de Libros</p>
        <p className="text-base text-gray-600">Gestiona el inventario de la tienda.</p>
      </div>
      <div>
        <Button 
            variant="secondary"
            className="px-4 py-2 rounded bg-gray-200 dark:bg-blue-600 text-black dark:text-white"
            onClick={() => navigate("/admin/ventas")}>
            Ver Ventas
        </Button>
      </div>
      <Button variant="secondary" onClick={onLogoutClick}>
          Cerrar sesión
      </Button>
    </div>
  );
}

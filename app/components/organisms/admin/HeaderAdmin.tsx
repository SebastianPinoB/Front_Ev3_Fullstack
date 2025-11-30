import Button from "~/components/atoms/Admin/Button";

export default function HeaderAdmin({ onLogoutClick }: { onLogoutClick: () => void }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex flex-col gap-1">
        <p className="text-3xl font-bold text-gray-900">Panel de Administración de Libros</p>
        <p className="text-base text-gray-600">Gestiona el inventario de la tienda.</p>
      </div>

      <Button variant="secondary" onClick={onLogoutClick}>
        ⬅ Cerrar sesión
      </Button>
    </div>
  );
}

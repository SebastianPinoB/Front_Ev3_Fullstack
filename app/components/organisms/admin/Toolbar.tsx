import Input from "~/components/atoms/Admin/Input";
import Button from "~/components/atoms/Admin/Button";

export default function Toolbar({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-wrap justify-between gap-4 py-3">

      {/* Barra de búsqueda con estilos restaurados */}
      <Input
        placeholder="Buscar por título o autor..."
        className="w-full max-w-sm h-10 px-4 rounded-lg border border-gray-300 bg-white text-gray-800"
      />

      <div className="flex gap-2">
        <Button variant="secondary">Filtros</Button>
        <Button onClick={onAdd}>+ Añadir Libro</Button>
      </div>
    </div>
  );
}

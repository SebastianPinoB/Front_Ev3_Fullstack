import Input from "~/components/atoms/Admin/Input";

interface LibroFormProps {
  nuevoLibro: {
    titulo?: string;
    autor?: string;
    anio?: number;
    precio?: number;
    stock?: number;
    categoria?: string;
    isbn?: string;
  };
  setNuevoLibro: (lib: any) => void;
}

export default function LibroForm({ nuevoLibro, setNuevoLibro }: LibroFormProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm text-gray-700">
        Título *
        <Input
          required
          value={nuevoLibro.titulo || ""}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, titulo: e.target.value })}
        />
      </label>

      <label className="text-sm text-gray-700">
        Autor *
        <Input
          required
          value={nuevoLibro.autor || ""}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, autor: e.target.value })}
        />
      </label>

      <label className="text-sm text-gray-700">
        Año *
        <Input
          required
          type="number"
          min={0}
          value={nuevoLibro.anio ?? ""}
          onChange={(e) =>
            setNuevoLibro({ ...nuevoLibro, anio: e.target.value === "" ? undefined : Number(e.target.value) })
          }
        />
      </label>

      <label className="text-sm text-gray-700">
        Precio *
        <Input
          required
          type="number"
          min={0}
          value={nuevoLibro.precio ?? ""}
          onChange={(e) =>
            setNuevoLibro({ ...nuevoLibro, precio: e.target.value === "" ? undefined : Number(e.target.value) })
          }
        />
      </label>

      <label className="text-sm text-gray-700">
        Stock *
        <Input
          required
          type="number"
          min={0}
          value={nuevoLibro.stock ?? ""}
          onChange={(e) =>
            setNuevoLibro({ ...nuevoLibro, stock: e.target.value === "" ? undefined : Number(e.target.value) })
          }
        />
      </label>

      <label className="text-sm text-gray-700">
        Categoría *
        <Input
          required
          value={nuevoLibro.categoria || ""}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, categoria: e.target.value })}
        />
      </label>

      <label className="text-sm text-gray-700">
        ISBN *
        <Input
          required
          value={nuevoLibro.isbn || ""}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, isbn: e.target.value })}
        />
      </label>
    </div>
  );
}

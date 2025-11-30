import Input from "~/components/atoms/Admin/Input";

interface LibroFormProps {
  nuevoLibro: any;
  setNuevoLibro: (lib: any) => void;
}

export default function LibroForm({ nuevoLibro, setNuevoLibro }: LibroFormProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm text-gray-700">
        Título
        <Input
          value={nuevoLibro.titulo}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, titulo: e.target.value })}
        />
      </label>

      <label className="text-sm text-gray-700">
        Autor
        <Input
          value={nuevoLibro.autor}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, autor: e.target.value })}
        />
      </label>

      <label className="text-sm text-gray-700">
        Precio
        <Input
          type="number"
          value={nuevoLibro.precio}
          onChange={(e) =>
            setNuevoLibro({ ...nuevoLibro, precio: Number(e.target.value) })
          }
        />
      </label>

      <label className="text-sm text-gray-700">
        Stock
        <Input
          type="number"
          value={nuevoLibro.stock}
          onChange={(e) =>
            setNuevoLibro({ ...nuevoLibro, stock: Number(e.target.value) })
          }
        />
      </label>
    </div>
  );
}

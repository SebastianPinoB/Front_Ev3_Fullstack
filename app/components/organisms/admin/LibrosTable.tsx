import TableActions from "~/components/molecules/Admin/TableActions";

export default function LibrosTable({ libros, onDelete }: any) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white mt-4 shadow">

      <table className="min-w-full divide-y divide-gray-200">

        {/* ENCABEZADOS CON ESTILOS RESTAURADOS */}
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Título
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Autor
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Precio
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {libros.map((l: any) => (
            <tr key={l.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 text-sm text-gray-900">{l.titulo}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{l.autor}</td>
              <td className="px-6 py-4 text-sm text-gray-900">${l.precio}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{l.stock}</td>
              <td className="px-6 py-4 text-right">
                <TableActions
                  onEdit={() => alert("Editar (pendiente)")}
                  onDelete={() => onDelete(l.id)}
                />
              </td>
            </tr>
          ))}

          {/* FILA VACÍA */}
          {libros.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-4 text-center text-gray-500 text-sm"
              >
                No hay libros
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}

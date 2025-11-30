import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProtectedRoute from "~/utils/ProtectedRoute";

// Layout
import AdminLayout from "~/components/layouts/AdminLayout";

// Organisms
import HeaderAdmin from "~/components/organisms/admin/HeaderAdmin";
import Toolbar from "~/components/organisms/admin/Toolbar";
import LibrosTable from "~/components/organisms/admin/LibrosTable";

// Molecules
import LogoutDialog from "~/components/molecules/Admin/LogoutDialog";
import LibroForm from "~/components/molecules/Admin/LibroForm";

// Atoms
import Button from "~/components/atoms/Admin/Button";
import ModalBackdrop from "~/components/atoms/Admin/ModalBackdrop";


// ================================
//   TIPADO — INTERFAZ DE LIBRO
// ================================
interface Libro {
  id: number;
  titulo: string;
  autor: string;
  precio: number;
  stock: number;
}


export default function AdminPage() {
  const navigate = useNavigate();

  // ================================
  //   ESTADOS TIPADOS
  // ================================

  // Libros cargados desde el backend
  const [libros, setLibros] = useState<Libro[]>([]);

  // Modal: Añadir libro
  const [mostrarModal, setMostrarModal] = useState(false);

  // Modal: Logout
  const [mostrarLogout, setMostrarLogout] = useState(false);

  // Formulario del libro nuevo (sin id)
  const [nuevoLibro, setNuevoLibro] = useState<Omit<Libro, "id">>({
    titulo: "",
    autor: "",
    precio: 0,
    stock: 0,
  });


  // ================================
  //   OBTENER LIBROS DESDE API
  // ================================
  useEffect(() => {
    fetch("http://localhost:8080/api/libros")
      .then((res) => res.json())
      .then((data: Libro[]) => setLibros(data));
  }, []);


  // ================================
  //   ELIMINAR LIBRO
  // ================================
  const eliminarLibro = async (id: number) => {
    await fetch(`http://localhost:8080/api/libros/${id}`, {
      method: "DELETE",
    });

    setLibros(libros.filter((l) => l.id !== id));
  };


  // ================================
  //   GUARDAR LIBRO NUEVO
  // ================================
  const guardarLibro = async () => {
    const resp = await fetch("http://localhost:8080/api/libros", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoLibro),
    });

    const creado: Libro = await resp.json();

    setLibros([...libros, creado]);
    setMostrarModal(false);

    // Reset formulario
    setNuevoLibro({
      titulo: "",
      autor: "",
      precio: 0,
      stock: 0,
    });
  };


  // ================================
  //   CONFIRMAR LOGOUT
  // ================================
  const confirmarLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  // ================================
  //   RENDER
  // ================================
  return (
    <ProtectedRoute rolesPermitidos={["ROLE_ADMIN"]}>
      <AdminLayout>

        {/* ENCABEZADO */}
        <HeaderAdmin onLogoutClick={() => setMostrarLogout(true)} />

        {/* TOOLBAR */}
        <Toolbar onAdd={() => setMostrarModal(true)} />

        {/* TABLA */}
        <LibrosTable libros={libros} onDelete={eliminarLibro} />


        {/* ============================
            MODAL: AÑADIR LIBRO
        ============================ */}
        {mostrarModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            <ModalBackdrop onClick={() => setMostrarModal(false)} />

            <div className="relative bg-white w-full max-w-md p-6 rounded-lg shadow-xl z-10">
              <h2 className="text-2xl font-bold mb-4">Añadir Libro</h2>

              <LibroForm 
                nuevoLibro={nuevoLibro} 
                setNuevoLibro={setNuevoLibro} 
              />

              <div className="flex justify-end gap-3 mt-4">
                <Button variant="secondary" onClick={() => setMostrarModal(false)}>
                  Cancelar
                </Button>

                <Button onClick={guardarLibro}>Guardar</Button>
              </div>
            </div>
          </div>
        )}


        {/* ============================
            MODAL: CONFIRMAR LOGOUT
        ============================ */}
        {mostrarLogout && (
          <LogoutDialog
            onCancel={() => setMostrarLogout(false)}
            onConfirm={confirmarLogout}
          />
        )}

      </AdminLayout>
    </ProtectedRoute>
  );
}

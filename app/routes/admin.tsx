import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProtectedRoute from "~/utils/ProtectedRoute";

// Layout
import AdminLayout from "~/components/layouts/AdminLayout";

// Organisms
import HeaderAdmin from "~/components/organisms/admin/HeaderAdmin";
import Toolbar from "~/components/organisms/admin/Toolbar";
import LibrosTable from "~/components/organisms/admin/LibrosTable";
import { getLibros, createLibro, updateLibro, deleteLibro } from "~/components/api/LibrosApi";

// Molecules
import LogoutDialog from "~/components/molecules/Admin/LogoutDialog";
// import LibroForm from "~/components/molecules/Admin/LibroForm"; // ahora usamos Ant Form aquí

import { Form, Input as AntInput, InputNumber as AntInputNumber } from "antd";

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
  anio?: number;
  precio: number;
  stock: number;
  categoria?: string;
  isbn?: string;
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
    anio: undefined,
    precio: 0,
    stock: 0,
    categoria: "",
    isbn: "",
  });
  const [form] = Form.useForm();


  // ================================
  //   OBTENER LIBROS DESDE API
  // ================================
  useEffect(() => {
    (async () => {
      try {
        const data = await getLibros();
        setLibros(data);
      } catch (err) {
        console.error("Error cargando libros:", err);
      }
    })();
  }, []);


  // ================================
  //   ELIMINAR LIBRO
  // ================================
  const eliminarLibro = async (id: number) => {
    try {
      await deleteLibro(id);
      setLibros((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Error eliminando libro:", err);
    }
  };


  // ================================
  //   GUARDAR LIBRO NUEVO (vía Ant Form)
  // ================================
  const handleCreate = async (values: any) => {
    try {
      const creado = await createLibro(values);
      setLibros((prev) => [...prev, creado]);
      setMostrarModal(false);
      form.resetFields();

      // Reset formulario local por compatibilidad
      setNuevoLibro({
        titulo: "",
        autor: "",
        anio: undefined,
        precio: 0,
        stock: 0,
        categoria: "",
        isbn: "",
      });
    } catch (err) {
      console.error("Error creando libro:", err);
    }
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
        <LibrosTable
          libros={libros}
          onDelete={eliminarLibro}
          onUpdate={async (id: number, libro: Libro) => {
            try {
              await updateLibro(id, libro);
              setLibros((prev) => prev.map((l) => (l.id === id ? libro : l)));
            } catch (err) {
              console.error("Error actualizando libro desde tabla:", err);
            }
          }}
          onCreate={async (partial) => {
            try {
              const creado = await createLibro(partial);
              setLibros((prev) => [...prev, creado]);
              return creado;
            } catch (err) {
              console.error("Error creando libro desde tabla:", err);
            }
          }}
        />


        {/* ============================
            MODAL: AÑADIR LIBRO
        ============================ */}
        {mostrarModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            <ModalBackdrop onClick={() => setMostrarModal(false)} />

            <div className="relative bg-white w-full max-w-md p-6 rounded-lg shadow-xl z-10">
              <h2 className="text-2xl font-bold mb-4">Añadir Libro</h2>

              <Form
                form={form}
                layout="vertical"
                initialValues={nuevoLibro}
                onFinish={handleCreate}
              >
                <Form.Item label="Título" name="titulo" rules={[{ required: true, message: 'Título requerido' }]}
                >
                  <AntInput />
                </Form.Item>

                <Form.Item label="Autor" name="autor" rules={[{ required: true, message: 'Autor requerido' }]}
                >
                  <AntInput />
                </Form.Item>

                <Form.Item label="Año" name="anio" rules={[{ required: true, message: 'Año requerido' }]}
                >
                  <AntInputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Precio" name="precio" rules={[{ required: true, message: 'Precio requerido' }]}
                >
                  <AntInputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Stock" name="stock" rules={[{ required: true, message: 'Stock requerido' }]}
                >
                  <AntInputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Categoría" name="categoria" rules={[{ required: true, message: 'Categoría requerida' }]}
                >
                  <AntInput />
                </Form.Item>

                <Form.Item label="ISBN" name="isbn" rules={[{ required: true, message: 'ISBN requerido' }]}
                >
                  <AntInput />
                </Form.Item>

                <div className="flex justify-end gap-3 mt-4">
                  <Button variant="secondary" onClick={() => { setMostrarModal(false); form.resetFields(); }}>
                    Cancelar
                  </Button>

                  <Button type="submit">
                    Guardar
                  </Button>
                </div>
              </Form>
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

import React, { useState } from "react";
import { Table, Modal, Form, Input, InputNumber, Button } from "antd";

import TableActions from "../../molecules/Admin/TableActions";

import type { Libro } from "../../types/Libros";

interface Props {
  libros: Libro[];
  loading?: boolean;
  onDelete: (id: number) => Promise<void> | void;
  onUpdate: (id: number, libro: Libro) => Promise<void> | void;
  onCreate: (libro: Partial<Libro>) => Promise<Libro> | void;
}

export default function LibrosTable({ libros: propLibros, loading = false, onDelete, onUpdate, onCreate }: Props) {
  const [editingLibro, setEditingLibro] = useState<Libro | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleEdit = (libro: Libro) => {
    setEditingLibro(libro);
    setIsModalOpen(true);
  };

  const columns = [
    { title: "Título", dataIndex: "titulo", key: "titulo" },
    { title: "Autor", dataIndex: "autor", key: "autor" },
    { title: "Año", dataIndex: "anio", key: "anio" },
    { title: "Categoría", dataIndex: "categoria", key: "categoria" },
    { title: "ISBN", dataIndex: "isbn", key: "isbn" },
    {
      title: "Precio",
      key: "precio",
      render: (_: any, row: Libro) =>
        new Intl.NumberFormat("es-CL", {
          style: "currency",
          currency: "CLP",
          minimumFractionDigits: 0,
        }).format(row.precio),
    },
    { title: "Stock", dataIndex: "stock", key: "stock" },
    {
      title: "Acciones",
      key: "acciones",
      render: (_: any, row: Libro) => (
        <TableActions
          onDelete={() => onDelete(row.id)}
          onEdit={() => handleEdit(row)}
        />
      ),
    },
  ];

  return (
    <>
      <Table dataSource={propLibros} columns={columns} loading={loading} rowKey="id" />

      {/* Modal de edición */}
      <Modal
        title="Editar libro"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingLibro(null);
        }}
        footer={null}
      >
        {editingLibro && (
          <Form
            layout="vertical"
            initialValues={editingLibro}
            onFinish={(values) => {
              const updatedLibro = { ...editingLibro, ...values } as Libro;
              onUpdate(updatedLibro.id, updatedLibro);
              setIsModalOpen(false);
              setEditingLibro(null);
            }}
          >
            <Form.Item
              label="Título"
              name="titulo"
              rules={[{ required: true, message: "Ingresa el título" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Autor"
              name="autor"
              rules={[{ required: true, message: "Ingresa el autor" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Año"
              name="anio"
              rules={[{ required: true, message: "Ingresa el año" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Categoría"
              name="categoria"
              rules={[{ required: true, message: "Ingresa la categoría" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="ISBN"
              name="isbn"
              rules={[{ required: true, message: "Ingresa el ISBN" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Imagen (URL portada)"
              name="imagen"
              rules={[{ required: true, message: "Ingresa una URL de imagen" }]}
            >
              <Input placeholder="https://covers.openlibrary.org/b/id/xxxx.jpg" />
            </Form.Item>

            <Form.Item
              label="Precio"
              name="precio"
              rules={[{ required: true, message: "Ingresa el precio" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Stock"
              name="stock"
              rules={[{ required: true, message: "Ingresa el stock" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                Guardar cambios
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
}
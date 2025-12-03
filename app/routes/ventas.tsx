import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Typography,
  Space,
  Button,
  Tag,
  Modal,
  Spin,
  message,
} from "antd";
import { EyeOutlined, ReloadOutlined } from "@ant-design/icons";
import { obtenerVentas, obtenerVentasDelDia, type VentaResponse } from "~/components/api/VentasApi";

const { Title, Text } = Typography;

export default function VentasAdmin() {
  const [ventas, setVentas] = useState<VentaResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState<VentaResponse | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    setLoading(true);
    try {
      const data = await obtenerVentas();
      setVentas(data);
    } catch (error) {
      console.error("Error al cargar ventas:", error);
      message.error("Error al cargar las ventas");
    } finally {
      setLoading(false);
    }
  };

  const cargarVentasDelDia = async () => {
    setLoading(true);
    try {
      const data = await obtenerVentasDelDia();
      setVentas(data);
      message.success(`${data.length} ventas del día cargadas`);
    } catch (error) {
      console.error("Error al cargar ventas del día:", error);
      message.error("Error al cargar las ventas del día");
    } finally {
      setLoading(false);
    }
  };

  const verDetalle = (venta: VentaResponse) => {
    setVentaSeleccionada(venta);
    setModalVisible(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Fecha",
      dataIndex: "fechaVenta",
      key: "fechaVenta",
      render: (fecha: string) => new Date(fecha).toLocaleString("es-CL"),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total: number) => (
        <Text strong className="text-green-600">
          ${total.toLocaleString("es-CL")}
        </Text>
      ),
    },
    {
      title: "Items",
      dataIndex: "detalles",
      key: "items",
      render: (detalles: any[]) => (
        <Tag color="blue">{detalles.length} libro(s)</Tag>
      ),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_: any, record: VentaResponse) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => verDetalle(record)}
          size="small"
        >
          Ver Detalle
        </Button>
      ),
    },
  ];

  const detalleColumns = [
    {
      title: "Libro",
      dataIndex: ["libro", "titulo"],
      key: "libro",
    },
    {
      title: "Autor",
      dataIndex: ["libro", "autor"],
      key: "autor",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
    },
    {
      title: "Precio Unit.",
      dataIndex: "precioUnitario",
      key: "precioUnitario",
      render: (precio: number) => `$${precio.toLocaleString("es-CL")}`,
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (subtotal: number) => `$${subtotal.toLocaleString("es-CL")}`,
    },
  ];

  const calcularTotalGeneral = () => {
    return ventas.reduce((sum, venta) => sum + venta.total, 0);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Title level={2}>Gestión de Ventas</Title>
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={cargarVentasDelDia}
              type="default">
              Ventas del Día
            </Button>
          </Space>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <div className="text-center">
              <Text type="secondary">Total de Ventas</Text>
              <Title level={3}>{ventas.length}</Title>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <Text type="secondary">Total Recaudado</Text>
              <Title level={3} className="text-green-600">
                ${calcularTotalGeneral().toLocaleString("es-CL")}
              </Title>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <Text type="secondary">Libros Vendidos</Text>
              <Title level={3}>
                {ventas.reduce(
                  (sum, v) =>
                    sum + v.detalles.reduce((s, d) => s + d.cantidad, 0),
                  0
                )}
              </Title>
            </div>
          </Card>
        </div>

        {/* Tabla de ventas */}
        <Card>
          <Table
            columns={columns}
            dataSource={ventas}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showTotal: (total) => `Total: ${total} ventas`,
            }}
          />
        </Card>

        {/* Modal de detalle */}
        <Modal
          title={`Detalle de Venta #${ventaSeleccionada?.id}`}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setModalVisible(false)}>
              Cerrar
            </Button>,
          ]}
          width={800}
        >
          {ventaSeleccionada && (
            <div>
              <Space direction="vertical" className="w-full mb-4">
                <Text>
                  <strong>Fecha:</strong>{" "}
                  {new Date(ventaSeleccionada.fechaVenta).toLocaleString(
                    "es-CL"
                  )}
                </Text>
                <Text>
                  <strong>Total:</strong> $
                  {ventaSeleccionada.total.toLocaleString("es-CL")}
                </Text>
              </Space>

              <Table
                columns={detalleColumns}
                dataSource={ventaSeleccionada.detalles}
                rowKey="id"
                pagination={false}
              />
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
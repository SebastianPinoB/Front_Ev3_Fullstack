import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  Button,
  Space,
  Divider,
  Spin,
  Result,
  Table,
} from "antd";
import { CheckCircleOutlined, HomeOutlined, PrinterOutlined } from "@ant-design/icons";
import { obtenerVentaPorId, type VentaResponse } from "~/components/api/VentasApi";

const { Title, Text } = Typography;

export default function ConfirmacionVenta() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [venta, setVenta] = useState<VentaResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarVenta = async () => {
      try {
        if (id) {
          const data = await obtenerVentaPorId(parseInt(id));
          setVenta(data);
        }
      } catch (error) {
        console.error("Error al cargar la venta:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarVenta();
  }, [id]);

  // Función para calcular el precio sin IVA
  const calcularPrecioSinIVA = (precioConIVA: number) => {
    return precioConIVA / 1.19;
  };

  // Función para calcular el IVA
  const calcularIVA = (precioConIVA: number) => {
    return precioConIVA - calcularPrecioSinIVA(precioConIVA);
  };

  // Función para imprimir la boleta
  const imprimirBoleta = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!venta) {
    return (
      <Result
        status="404"
        title="Venta no encontrada"
        extra={
          <Button type="primary" onClick={() => navigate("/catalogo")}>
            Volver al catálogo
          </Button>
        }
      />
    );
  }

  const subtotalSinIVA = venta.detalles.reduce(
    (sum, detalle) => sum + calcularPrecioSinIVA(detalle.subtotal),
    0
  );
  const totalIVA = venta.detalles.reduce(
    (sum, detalle) => sum + calcularIVA(detalle.subtotal),
    0
  );

  const columns = [
    {
      title: "Libro",
      dataIndex: ["libro", "titulo"],
      key: "titulo",
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
      align: "center" as const,
    },
    {
      title: "Precio Unit. (sin IVA)",
      key: "precioSinIVA",
      align: "right" as const,
      render: (_: any, record: any) => 
        `$${calcularPrecioSinIVA(record.precioUnitario).toLocaleString("es-CL", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}`,
    },
    {
      title: "IVA (19%)",
      key: "iva",
      align: "right" as const,
      render: (_: any, record: any) => 
        `$${calcularIVA(record.precioUnitario * record.cantidad).toLocaleString("es-CL", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}`,
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
      align: "right" as const,
      render: (subtotal: number) => `$${subtotal.toLocaleString("es-CL")}`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#EEEEEE] px-6 md:px-12 py-10">
      <div className="max-w-4xl mx-auto">
        <Result
          status="success"
          icon={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
          title="¡Compra realizada exitosamente!"
          subTitle={`Número de boleta: ${venta.id} - Fecha: ${new Date(
            venta.fechaVenta
          ).toLocaleString("es-CL")}`}
        />

        {/* BOLETA */}
        <Card className="shadow-lg mt-6" id="boleta-content">
          {/* Encabezado de la boleta */}
          <div className="text-center border-b pb-4 mb-4">
            <Title level={3} className="!mb-1">Librería El literario sentimental</Title>
            <Text type="secondary">RUT: 23.232.777-5</Text>
            <br />
            <Text type="secondary">Dirección: Av. Enanas chicas 140, Santiago</Text>
            <br />
            <Text type="secondary">Teléfono: +56 2 2323 7772</Text>
            <Divider className="!my-3" />
            <Title level={4} className="!mb-0">BOLETA ELECTRÓNICA</Title>
            <Text strong>N° {venta.id.toString().padStart(8, "0")}</Text>
          </div>

          {/* Datos de la venta */}
          <div className="mb-4">
            <Text>
              <strong>Fecha:</strong>{" "}
              {new Date(venta.fechaVenta).toLocaleString("es-CL", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </div>

          <Divider />

          <Title level={4}>Detalle de la Compra</Title>

          <Table
            dataSource={venta.detalles}
            columns={columns}
            pagination={false}
            rowKey="id"
            size="small"
          />

          <Divider />

          {/* Totales */}
          <div className="flex justify-end">
            <div className="w-full md:w-1/2">
              <div className="flex justify-between mb-2">
                <Text>Subtotal (sin IVA):</Text>
                <Text strong>
                  ${subtotalSinIVA.toLocaleString("es-CL", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </Text>
              </div>

              <div className="flex justify-between mb-2">
                <Text>IVA (19%):</Text>
                <Text strong>
                  ${totalIVA.toLocaleString("es-CL", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </Text>
              </div>

              <Divider className="!my-2" />

              <div className="flex justify-between">
                <Title level={4} className="!mb-0">
                  TOTAL:
                </Title>
                <Title level={4} className="!mb-0 text-green-600">
                  ${venta.total.toLocaleString("es-CL")}
                </Title>
              </div>
            </div>
          </div>

          <Divider />

          <div className="text-center text-gray-500">
            <Text type="secondary" className="text-xs">
              ¡Gracias por su compra!
              <br />
              Esta boleta es válida como documento tributario electrónico
            </Text>
          </div>
        </Card>

        {/* Botones de acción */}
        <div className="flex justify-center gap-4 mt-8 print:hidden">
          <Button
            size="large"
            icon={<PrinterOutlined />}
            onClick={imprimirBoleta}
          >
            Imprimir Boleta
          </Button>
          
          <Button
            type="primary"
            size="large"
            icon={<HomeOutlined />}
            onClick={() => navigate("/usuario")}
          >
            Volver al Catálogo
          </Button>
        </div>
      </div>

      {/* Estilos para impresión */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #boleta-content, #boleta-content * {
            visibility: visible;
          }
          #boleta-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
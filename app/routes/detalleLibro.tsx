import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  InputNumber,
  Card,
  Space,
  Divider,
  Spin,
  message,
  Tag,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getLibros } from "~/components/api/LibrosApi";
import { addToCart } from "~/utils/cart";
import type { Libro } from "~/components/types/Libros";

const { Title, Text, Paragraph } = Typography;

// Los mismos libros mock del catálogo
const librosMock = [
  {
    id: 1,
    titulo: "Cien Años de Soledad",
    autor: "Gabriel García Márquez",
    precio: 19990,
    imagen: "https://covers.openlibrary.org/b/id/10245614-L.jpg",
    stock: 10,
    descripcion: "Una obra maestra del realismo mágico que narra la historia de la familia Buendía a lo largo de varias generaciones en el pueblo ficticio de Macondo.",
  },
  {
    id: 2,
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    precio: 12500,
    imagen: "https://covers.openlibrary.org/b/id/10501867-L.jpg",
    stock: 10,
    descripcion: "La novela más influyente de la literatura española, que sigue las aventuras del ingenioso hidalgo Don Quijote y su fiel escudero Sancho Panza.",
  },
  {
    id: 3,
    titulo: "La Sombra del Viento",
    autor: "Carlos Ruiz Zafón",
    precio: 18000,
    imagen: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
    stock: 10,
    descripcion: "Un joven descubre un libro maldito que cambiará su vida para siempre en la Barcelona de la posguerra.",
  },
  {
    id: 4,
    titulo: "El Amor en los Tiempos del Cólera",
    autor: "Gabriel García Márquez",
    precio: 20000,
    imagen: "https://covers.openlibrary.org/b/id/10333850-L.jpg",
    stock: 10,
    descripcion: "Una historia de amor que perdura más de medio siglo, explorando la naturaleza del amor en todas sus formas.",
  },
  {
    id: 5,
    titulo: "Ficciones",
    autor: "Jorge Luis Borges",
    precio: 15500,
    imagen: "https://covers.openlibrary.org/b/id/8319256-L.jpg",
    stock: 10,
    descripcion: "Una colección de cuentos que desafían la realidad y exploran laberintos metafísicos.",
  },
];

export default function DetalleLibro() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [libro, setLibro] = useState<Libro | null>(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const fetchLibro = async () => {
      try {
        const libroId = parseInt(id || "0");
        
        // Primero buscar en mock
        const libroMock = librosMock.find((l) => l.id === libroId);
        if (libroMock) {
          setLibro(libroMock);
          setLoading(false);
          return;
        }

        // Si no está en mock, buscar en API
        try {
          const dbLibros = await getLibros();
          const libroDb = dbLibros.find((l) => l.id === libroId);
          
          if (libroDb) {
            setLibro(libroDb);
          } else {
            message.error("Libro no encontrado");
          }
        } catch (apiError) {
          console.error("Error fetching from API:", apiError);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLibro();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (libro && typeof window !== 'undefined') {
      addToCart(libro, cantidad);
      message.success(`${cantidad} libro(s) añadido(s) al carrito`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Spin size="large" tip="Cargando libro..." />
      </div>
    );
  }

  if (!libro) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <Title level={3}>Libro no encontrado</Title>
        <Button 
          type="primary" 
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/usuario")}
          className="mt-4"
        >
          Volver al catálogo
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEEEEE] px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto">
        <Button 
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/usuario")}
          className="mb-6"
          size="large"
        >
          Volver al catálogo
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Card
            className="shadow-lg rounded-xl"
            cover={
              <div className="bg-white p-8 flex items-center justify-center">
                <img
                  src={libro.imagen || "https://via.placeholder.com/350x500"}
                  alt={libro.titulo}
                  className="object-contain w-full max-h-[500px] rounded-xl"
                />
              </div>
            }
          />

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <Title level={2} className="!mb-2">{libro.titulo}</Title>
            <Text className="text-lg text-gray-600">por {libro.autor}</Text>
            <Divider />

            <div className="my-6">
              <Title level={2} className="!text-[#008000] !mb-2">
                ${libro.precio.toLocaleString('es-CL')}
              </Title>
              
              <Space size="small" className="mb-4">
                <Tag color="green">✔ En Stock</Tag>
                <Tag color="blue">Envío gratis</Tag>
                <Tag color="gold">Nuevo</Tag>
              </Space>
            </div>

            <Space direction="vertical" size="large" className="w-full">
              <div>
                <Text strong className="block mb-2">Cantidad:</Text>
                <InputNumber 
                  min={1} 
                  max={libro.stock || 10} 
                  value={cantidad}
                  onChange={(val) => setCantidad(val || 1)}
                  size="large"
                  className="w-32"
                />
              </div>

              <Space size="middle" className="w-full" direction="vertical">
                <Button 
                  type="primary" 
                  size="large"
                  className="w-full bg-[#FFE600] hover:bg-[#f5d800] text-black font-medium border-none"
                  onClick={handleAddToCart}
                >
                  Añadir al Carrito
                </Button>

                <Button 
                  size="large"
                  className="w-full"
                  onClick={() => navigate("/carrito")}
                >
                  Ir al Carrito
                </Button>
              </Space>
            </Space>

            <Divider />

            <div>
                <Title level={4}>Descripción</Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                    {"Un libro muy bueno recomendado por nosotros."}
                </Paragraph>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
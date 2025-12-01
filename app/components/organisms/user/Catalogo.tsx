import React, { useEffect, useState } from "react";
import {
   Card,
   Row,
   Col,
   Typography,
   Input,
   Select,
   Space,
   Spin,
   message,
   Button,
   Pagination,
   Tag,
} from "antd";
import { getLibros } from "~/components/api/LibrosApi";
import type { Libro } from "~/components/types/Libros";
import { addToCart } from "~/utils/cart";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Search } = Input;

// ---------------- MOCK ----------------
const librosMock = [
   {
      id: 1,
      titulo: "Cien Años de Soledad",
      autor: "Gabriel García Márquez",
      precio: 19990,
      imagen: "https://covers.openlibrary.org/b/id/10245614-L.jpg",
      stock: 10,
   },
   {
      id: 2,
      titulo: "Don Quijote de la Mancha",
      autor: "Miguel de Cervantes",
      precio: 12500,
      imagen: "https://covers.openlibrary.org/b/id/10501867-L.jpg",
      stock: 10,
   },
   {
      id: 3,
      titulo: "La Sombra del Viento",
      autor: "Carlos Ruiz Zafón",
      precio: 18000,
      imagen: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
      stock: 10,
   },
   {
      id: 4,
      titulo: "El Amor en los Tiempos del Cólera",
      autor: "Gabriel García Márquez",
      precio: 20000,
      imagen: "https://covers.openlibrary.org/b/id/10333850-L.jpg",
      stock: 10,
   },
   {
      id: 5,
      titulo: "Ficciones",
      autor: "Jorge Luis Borges",
      precio: 15500,
      imagen: "https://covers.openlibrary.org/b/id/8319256-L.jpg",
      stock: 10,
   },
];

export default function Catalogo() {
   const [filtroTexto, setFiltroTexto] = useState("");
   const [categorias, setCategorias] = useState<string | null>(null);
   const [dbLibros, setDbLibros] = useState<Libro[]>([]);
   const [loading, setLoading] = useState(false);
   const [page, setPage] = useState(1);
   const pageSize = 6;

   const navigate = useNavigate();

   useEffect(() => {
      (async () => {
         setLoading(true);
         try {
            const data = await getLibros();
            setDbLibros(data);
         } catch (err) {
            console.error("Error fetching libros:", err);
            message.error("No se pudieron cargar los libros desde el servidor.");
         } finally {
            setLoading(false);
         }
      })();
   }, []);

   // COMBINAR API + MOCK
   const libros = [
      ...librosMock,
      ...dbLibros.filter((d) => !librosMock.some((m) => m.id === d.id)),
   ];

   // FILTROS
   const filtrados = libros.filter((libro) => {
      const matchTexto =
         libro.titulo.toLowerCase().includes(filtroTexto.toLowerCase()) ||
         libro.autor.toLowerCase().includes(filtroTexto.toLowerCase());


      return matchTexto;
   });

   // PAGINACIÓN
   const start = (page - 1) * pageSize;
   const paginated = filtrados.slice(start, start + pageSize);

   return (
      <div className="w-full min-h-screen bg-[#EEEEEE] px-10 py-10">
         <Title level={2} className="text-center !mb-8">
            Catálogo de Libros
         </Title>

         {/* ---------------- BARRA DE BUSQUEDA ---------------- */}
         <div className="bg-white p-6 shadow-md rounded-xl mb-10 flex flex-wrap gap-4 items-center justify-between">
            <Space size="large" wrap>
               <Search
                  placeholder="Buscar por título o autor"
                  allowClear
                  onSearch={(value) => {
                     setFiltroTexto(value);
                     setPage(1);
                  }}
                  style={{ width: 280 }}
               />

               <Select
                  placeholder="Categorías"
                  style={{ width: 180 }}
                  onChange={(v) => {
                     setCategorias(v);
                     setPage(1);
                  }}
                  defaultValue="all"
                  options={[
                     { label: "Todas", value: "all" },
                     { label: "Novela", value: "novela" },
                     { label: "Clásicos", value: "clasicos" },
                     { label: "Fantasia", value: "fantasia" },
                  ]}
               />
            </Space>

            <Button type="primary" onClick={() => navigate("/carrito")} size="large">
               Ver carrito
            </Button>
         </div>

         {/* ---------------- GRID ESTILO MERCADO LIBRE ---------------- */}
         {loading ? (
            <div className="flex justify-center py-12">
               <Spin size="large" />
            </div>
         ) : (
            <>
               <Row gutter={[20, 25]}>
                  {paginated.map((libro) => (
                     <Col key={libro.id} xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Card
                           hoverable
                           className="shadow-md hover:shadow-xl transition-all rounded-lg bg-white h-full"
                           bodyStyle={{ padding: 0 }}
                        >
                           <div className="flex h-full">

                              {/* Imagen proporcional más pequeña */}
                              <div className="w-[110px] h-[160px] rounded-l-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                 <img
                                    src={libro.imagen}
                                    className="w-full h-full object-cover"
                                    alt={libro.titulo}
                                 />
                              </div>

                              {/* Información */}
                              <div className="p-3 flex flex-col justify-between h-full w-full">

                                 <div className="min-h-[90px] flex flex-col">
                                    <Title level={5} className="!mb-1 !text-base line-clamp-2">
                                       {libro.titulo}
                                    </Title>

                                    <Text type="secondary" className="block !text-xs line-clamp-1">
                                       {libro.autor}
                                    </Text>

                                    <div className="mt-1">
                                       <Tag color="green">Envío gratis</Tag>
                                       <Tag color="blue">Nuevo</Tag>
                                    </div>
                                 </div>

                                 <div>
                                    <Title level={4} className="!mt-1 !text-lg text-[#008000]">
                                       ${libro.precio}
                                    </Title>

                                    {/* Botón comprar */}
                                    <Button
                                       className="w-full bg-[#FFE600] hover:bg-[#f5d800] text-black font-medium border-none mt-2"
                                       onClick={() => {
                                          addToCart(libro as Libro, 1);
                                          message.success("Libro añadido al carrito");
                                          window.dispatchEvent(new Event("cart-changed"));
                                       }}
                                    >
                                       Comprar ahora
                                    </Button>

                                    {/* Nuevo botón detalle */}
                                    <Button
                                       type="default"
                                       className="w-full mt-2"
                                       onClick={() => navigate(`/libro/${libro.id}`)}
                                    >
                                       Ver detalle
                                    </Button>
                                 </div>

                              </div>
                           </div>
                        </Card>
                     </Col>
                  ))}
               </Row>

               {/* ---------------- PAGINACIÓN ---------------- */}
               <div className="flex justify-center mt-10">
                  <Pagination
                     current={page}
                     pageSize={pageSize}
                     total={filtrados.length}
                     onChange={(p) => setPage(p)}
                     showSizeChanger={false}
                  />
               </div>
            </>
         )}
      </div>
   );
}

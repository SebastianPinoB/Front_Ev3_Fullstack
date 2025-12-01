import React, { useEffect, useState } from "react";
import { Badge, Button } from "antd";
import { ShoppingCartOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { getCart } from "~/utils/cart";
import { useNavigate } from "react-router-dom";

export default function UserHeader() {
   const [count, setCount] = useState(0);
   const navigate = useNavigate();

   useEffect(() => {
      const update = () => {
         const items = getCart();
         const total = items.reduce((s, it) => s + it.cantidad, 0);
         setCount(total);
      };

      update();
      window.addEventListener("cart-changed", update);
      return () => window.removeEventListener("cart-changed", update);
   }, []);

   return (
      <header className="w-full bg-white shadow-md py-3 px-4 flex items-center justify-between sticky top-0 z-50">

         {/* Botón volver (izquierda) */}
         <Button
            type="text"
            icon={<ArrowLeftOutlined style={{ fontSize: 20 }} />}
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-black"
         />

         {/* Título centrado */}
         <h1 className="text-xl font-bold text-gray-900 absolute left-1/2 transform -translate-x-1/2">
            Tienda de Libros
         </h1>

         {/* Carrito alineado a la derecha */}
         <Badge count={count} offset={[0, 6]}>
            <Button
               type="text"
               onClick={() => navigate("/carrito")}
               icon={<ShoppingCartOutlined style={{ fontSize: 22 }} />}
               className="flex items-center text-gray-600 hover:text-black"
            />
         </Badge>
      </header>
   );
}

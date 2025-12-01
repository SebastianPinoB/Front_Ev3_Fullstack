import React, { useEffect, useMemo, useState } from "react";
import UserLayout from "~/components/layouts/UserLayout";
import CartTable from "~/components/organisms/user/CartTable";
import CartSummary from "~/components/organisms/user/CartSummary";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { getCart, saveCart, type CartItem as RawCartItem } from "~/utils/cart";

export default function CarritoPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<RawCartItem[]>(getCart());

  // Guardar en localStorage cada vez que cambian
  useEffect(() => {
    saveCart(items);
  }, [items]);

  // Adaptar datos para CartTable
  const displayItems = useMemo(() => {
    return items.map((it) => ({
      id: String(it.libro.id),
      title: it.libro.titulo,
      author: it.libro.autor,
      price: it.libro.precio,
      qty: it.cantidad,
      image: it.libro.imagen, // aquí va la URL o ruta de la imagen
    }));
  }, [items]);

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.libro.precio * it.cantidad, 0),
    [items]
  );

  function handleQtyChange(id: string, qty: number) {
    const libroId = Number(id);
    setItems((prev) =>
      prev.map((it) => (it.libro.id === libroId ? { ...it, cantidad: qty } : it))
    );
    message.success("Cantidad actualizada");
  }

  function handleRemove(id: string) {
    const libroId = Number(id);
    setItems((prev) => prev.filter((it) => it.libro.id !== libroId));
    message.success("Producto eliminado");
  }

  function handleCheckout() {
    navigate("/checkout");
  }

  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold">Mi Carrito de Compras</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartTable items={displayItems} onQtyChange={handleQtyChange} onRemove={handleRemove} />

            <div className="flex gap-3 mt-4">
              <button
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 font-bold"
                onClick={() => navigate("/")}
              >
                Continuar Comprando
              </button>
              <button
                className="px-4 py-2 rounded border font-bold text-primary"
                onClick={() => message.info("Cantidades actualizadas")}
              >
                Actualizar Cantidades
              </button>
            </div>
          </div>

          <div>
            <CartSummary subtotal={subtotal} onCheckout={handleCheckout} />
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

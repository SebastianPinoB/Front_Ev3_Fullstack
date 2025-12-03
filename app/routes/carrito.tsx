import React, { useEffect, useMemo, useState } from "react";
import UserLayout from "~/components/layouts/UserLayout";
import CartTable from "~/components/organisms/user/CartTable";
import CartSummary from "~/components/organisms/user/CartSummary";
import { message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { getCart, saveCart, clearCart, type CartItem as RawCartItem } from "~/utils/cart";
import { crearVenta } from "~/components/api/VentasApi";

export default function CarritoPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<RawCartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // cargar el carrito solo en el cliente
  useEffect(() => {
    setMounted(true);
    setItems(getCart());
  }, []);

  // guardar en localStorage cada vez que cambian
  useEffect(() => {
    if (mounted) {
      saveCart(items);
    }
  }, [items, mounted]);

  // Adaptar datos para CartTable
  const displayItems = useMemo(() => {
    return items.map((it) => ({
      id: String(it.libro.id),
      title: it.libro.titulo,
      author: it.libro.autor,
      price: it.libro.precio,
      qty: it.cantidad,
      image: it.libro.imagen,
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

  async function handleCheckout() {
  if (items.length === 0) {
    message.warning("El carrito está vacío");
    return;
  }

  Modal.confirm({
    title: "¿Confirmar compra?",
    content: `Total a pagar: $${subtotal.toLocaleString("es-CL")}`,
    okText: "Confirmar",
    cancelText: "Cancelar",
    onOk: async () => {
      setLoading(true);
      try {
        const ventaRequest = {
          items: items.map((item) => ({
            libroId: item.libro.id,
            cantidad: item.cantidad,
            precio: item.libro.precio,
          })),
          total: subtotal,
        };

        console.log("📦 Request a enviar:", ventaRequest); // DEBUG

        const venta = await crearVenta(ventaRequest);

        console.log(" Venta creada:", venta); // DEBUG

        clearCart();
        setItems([]);

        message.success(
          `¡Compra realizada exitosamente! Número de venta: ${venta.id}`
        );

        navigate(`/confirmacionVenta/${venta.id}`);
      } catch (error: any) {
        console.error("❌ Error completo:", error); // DEBUG
        console.error("❌ Error message:", error.message); // DEBUG
        message.error(
          error.message || "Error al procesar la compra. Intenta nuevamente."
        );
      } finally {
        setLoading(false);
      }
    },
  });
}

  // mostrar loading mientras se carga en el cliente
  if (!mounted) {
    return (
      <UserLayout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            Cargando carrito...
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Mi Carrito de Compras
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartTable items={displayItems} onQtyChange={handleQtyChange} onRemove={handleRemove} />

            <div className="flex gap-3 mt-4">
              <button
                className="px-4 py-2 rounded bg-gray-200 dark:bg-blue-600 font-bold"
                onClick={() => navigate("/usuario")}
              >
                Continuar Comprando
              </button>
              <button
                className="x-4 py-2 rounded bg-gray-200 dark:bg-gray-700 font-bold"
                onClick={() => message.info("Cantidades actualizadas")}
              >
                Actualizar Cantidades 
              </button>
            </div>
          </div>

          <div>
            <CartSummary subtotal={subtotal} onCheckout={handleCheckout} loading={loading} />
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
import React, { useEffect, useState } from "react";
import { List, Card, Button, InputNumber, Typography, message, Empty } from "antd";
import { getCart, removeFromCart, updateQuantity, clearCart, getCartTotal } from "~/utils/cart";
import type { CartItem } from "~/utils/cart";

const { Title, Text } = Typography;

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const data = getCart();
    setItems(data);
    setTotal(getCartTotal());
  }, []);

  const handleRemove = (id: number) => {
    const newItems = removeFromCart(id);
    setItems(newItems);
    setTotal(getCartTotal());
    message.success("Producto eliminado del carrito");
  };

  const handleQty = (id: number, qty: number) => {
    const newItems = updateQuantity(id, qty);
    setItems(newItems);
    setTotal(getCartTotal());
  };

  const handleClear = () => {
    clearCart();
    setItems([]);
    setTotal(0);
    message.info("Carrito vaciado");
  };

  const handleCheckout = () => {
    message.success("Funcionalidad de pago no implementada (placeholder)");
  };

  if (items.length === 0) {
    return (
      <div className="p-8">
        <Title level={2}>Tu Carrito</Title>
        <Empty description="No hay productos en el carrito" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <Title level={2}>Tu Carrito</Title>

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <Card className="flex items-center gap-6">
              <img src={(item.libro as any).imagen || 'https://via.placeholder.com/120x160?text=No+Image'} alt={item.libro.titulo} className="w-24 h-32 object-cover rounded" />

              <div className="flex-1">
                <Title level={5} className="!mb-0">{item.libro.titulo}</Title>
                <Text type="secondary">{item.libro.autor}</Text>
                <div className="mt-2">
                  <Text strong>${item.libro.precio}</Text>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <InputNumber min={1} value={item.cantidad} onChange={(val) => handleQty(item.libro.id, val || 1)} />

                <Button danger onClick={() => handleRemove(item.libro.id)}>Eliminar</Button>
              </div>
            </Card>
          </List.Item>
        )}
      />

      <div className="flex justify-end items-center gap-4 mt-6">
        <Text strong className="text-lg">Total: ${total}</Text>
        <Button onClick={handleClear}>Vaciar carrito</Button>
        <Button type="primary" onClick={handleCheckout}>Pagar</Button>
      </div>
    </div>
  );
}

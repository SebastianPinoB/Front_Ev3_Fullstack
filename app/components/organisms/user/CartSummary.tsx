// components/organisms/user/CartSummary.tsx
import React from "react";
import { Card, Button } from "antd";

type Props = {
  subtotal: number;
  shipping?: number;
  onCheckout: () => void;
};

export default function CartSummary({ subtotal, shipping = 5.0, onCheckout }: Props) {
  const total = subtotal + shipping;
  return (
    <Card>
      <h3 className="text-xl font-bold mb-4">Resumen del Pedido</h3>
      <div className="flex justify-between mb-2 text-gray-600">
        <span>Subtotal</span>
        <span>${subtotal}</span>
      </div>
      <div className="flex justify-between mb-4 text-gray-600">
        <span>Envío</span>
        <span>${shipping}</span>
      </div>
      <div className="border-t pt-4 font-bold text-lg flex justify-between mb-4">
        <span>Total</span>
        <span>${total}</span>
      </div>
      <Button type="primary" block onClick={onCheckout}>
        Proceder al Pago
      </Button>
    </Card>
  );
}

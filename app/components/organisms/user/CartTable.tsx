// components/organisms/user/CartTable.tsx
import React from "react";
import CartItemRow from "~/components/molecules/user/CartItemRow";
import type { CartItem } from "~/components/molecules/user/CartItemRow";

type Props = {
  items: CartItem[];
  onQtyChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
};

export default function CartTable({ items, onQtyChange, onRemove }: Props) {
  if (!items || items.length === 0) {
    return <div className="p-6 bg-white dark:bg-[#0f1724] rounded border text-center">Tu carrito está vacío.</div>;
  }

  return (
    <div className="bg-white dark:bg-transparent rounded border">
      {items.map((it) => (
        <CartItemRow key={it.id} item={it} onQtyChange={onQtyChange} onRemove={onRemove} />
      ))}
    </div>
  );
}

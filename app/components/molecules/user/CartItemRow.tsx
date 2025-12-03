// components/molecules/CartItemRow.tsx
import React from "react";
import { InputNumber, Typography, Image, Space, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
const { Text } = Typography;

export type CartItem = {
  id: string;
  title: string;
  author?: string;
  price: number;
  qty: number;
  image?: string;
};

type Props = {
  item: CartItem;
  onQtyChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
};

export default function CartItemRow({ item, onQtyChange, onRemove }: Props) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200 last:border-b-0 bg-white">
      <div style={{ width: 72 }}>
        <Image src={item.image} alt={item.title} width={56} height={80} preview={false} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-semibold text-base text-gray-900">
              {item.title}
            </div>
            {item.author && (
              <div className="text-sm text-gray-600">
                {item.author}
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-900">
              ${item.price.toLocaleString("es-CL")}
            </div>
            <div className="text-sm text-gray-600">
              ${(item.price * item.qty).toLocaleString("es-CL")}
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Space>
            <InputNumber
              min={1}
              value={item.qty}
              onChange={(v) => onQtyChange(item.id, Number(v || 1))}
            />
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onRemove(item.id)}
            >
              Eliminar
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
}
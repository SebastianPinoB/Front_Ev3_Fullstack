import React from "react";
import { Card, Row, Col, Tag, Button as AntButton } from "antd";
import type { Libro } from "../../types/Libros";
import Button from "~/components/atoms/Admin/Button";

interface Props {
  libros: Libro[];
  onBuy: (libro: Libro) => Promise<void> | void;
}

export default function BooksGrid({ libros, onBuy }: Props) {
  return (
    <div className="p-4">
      <Row gutter={[16, 16]}>
        {libros.map((l) => (
          <Col key={l.id} xs={24} sm={12} md={8} lg={6}>
            <Card className="h-full" bodyStyle={{ padding: 12 }}>
              <div className="flex flex-col gap-3">
                <div className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg shadow-md" style={{ backgroundImage: `url(${(l as any).imagen || ''})` }} />
                <div>
                  <p className="text-base font-medium truncate">{l.titulo}</p>
                  <p className="text-sm text-gray-500">{l.autor}</p>
                  <p className="text-sm font-medium mt-1">{new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(l.precio)}</p>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div>
                    {l.stock > 0 ? <Tag color="green">Disponible</Tag> : <Tag color="red">Agotado</Tag>}
                  </div>
                  <div>
                    <Button onClick={() => onBuy(l)} disabled={l.stock <= 0}>
                      Comprar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

// app/components/types/Libro.ts

export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  anio?: number;
  precio: number;
  stock: number;
  imagen?: string;
  categoria?: string;
  isbn?: string;
}

const API_URL = "/api/ventas";

export interface ItemVenta {
  libroId: number;
  cantidad: number;
  precio: number;
}

export interface VentaRequest {
  items: ItemVenta[];
  total: number;
}

export interface LibroInfo {
  id: number;
  titulo: string;
  autor: string;
}

export interface DetalleVenta {
  id: number;
  libro: LibroInfo;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface VentaResponse {
  id: number;
  fechaVenta: string;
  total: number;
  detalles: DetalleVenta[];
}

export const crearVenta = async (ventaRequest: VentaRequest): Promise<VentaResponse> => {
  console.log("🔄 Enviando a:", API_URL); // DEBUG
  console.log("📝 Body:", JSON.stringify(ventaRequest)); // DEBUG
  
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ventaRequest),
  });

  console.log("📡 Response status:", response.status); // DEBUG
  console.log("📡 Response ok:", response.ok); // DEBUG

  if (!response.ok) {
    const error = await response.text();
    console.error("❌ Error del servidor:", error); // DEBUG
    throw new Error(error || "Error al crear la venta");
  }

  const data = await response.json();
  console.log("✅ Data recibida:", data); // DEBUG
  return data;
};

export const obtenerVentas = async (): Promise<VentaResponse[]> => {
  const response = await fetch(API_URL);
  
  if (!response.ok) {
    throw new Error("Error al obtener las ventas");
  }

  return response.json();
};

export const obtenerVentaPorId = async (id: number): Promise<VentaResponse> => {
  const response = await fetch(`${API_URL}/${id}`);
  
  if (!response.ok) {
    throw new Error("Error al obtener la venta");
  }

  return response.json();
};

export const obtenerVentasDelDia = async (): Promise<VentaResponse[]> => {
  const response = await fetch(`${API_URL}/hoy`);
  
  if (!response.ok) {
    throw new Error("Error al obtener las ventas del día");
  }

  return response.json();
};
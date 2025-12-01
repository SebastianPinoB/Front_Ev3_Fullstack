import { type Libro } from "~/components/types/Libros";

const CART_KEY = "cart";

// La definición de CartItem se mantiene aquí y se exporta para que
// todos los archivos usen esta única fuente de verdad.
export interface CartItem {
  libro: Libro;
  cantidad: number;
}

function readCart(): CartItem[] {
  // ... (lógica existente)
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch (err) {
    console.error("Error leyendo carrito:", err);
    return [];
  }
}

// Renombramos writeCart a saveCart y la exportamos para corregir el error 2305
export function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    try {
      // Notificar a otras partes de la app que el carrito cambió
      window.dispatchEvent(new Event("cart-changed"));
    } catch (e) {
      // ignore in non-browser environments
    }
  } catch (err) {
    console.error("Error guardando carrito:", err);
  }
}

export function getCart(): CartItem[] {
  return readCart();
}

export function addToCart(libro: Libro, cantidad = 1) {
  const items = readCart();
  const idx = items.findIndex((i) => i.libro.id === libro.id);
  if (idx >= 0) {
    items[idx].cantidad += cantidad;
    if (items[idx].cantidad < 1) items[idx].cantidad = 1;
  } else {
    items.push({ libro, cantidad });
  }
  saveCart(items); // Usamos la función exportada
  return items;
}

export function removeFromCart(libroId: number) {
  const items = readCart().filter((i) => i.libro.id !== libroId);
  saveCart(items);
  return items;
}

export function updateQuantity(libroId: number, cantidad: number) {
  const items = readCart();
  const idx = items.findIndex((i) => i.libro.id === libroId);
  if (idx >= 0) {
    items[idx].cantidad = Math.max(1, cantidad);
    saveCart(items);
  }
  return items;
}

export function clearCart() {
  saveCart([]);
}

export function getCartTotal() {
  const items = readCart();
  return items.reduce((sum, it) => sum + it.libro.precio * it.cantidad, 0);
}
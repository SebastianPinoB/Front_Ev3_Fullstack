import type { Libro } from "~/components/types/Libros";

const CART_KEY = "cart";

export interface CartItem {
  libro: Libro;
  cantidad: number;
}

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch (err) {
    console.error("Error leyendo carrito:", err);
    return [];
  }
}

function writeCart(items: CartItem[]) {
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
  writeCart(items);
  return items;
}

export function removeFromCart(libroId: number) {
  const items = readCart().filter((i) => i.libro.id !== libroId);
  writeCart(items);
  return items;
}

export function updateQuantity(libroId: number, cantidad: number) {
  const items = readCart();
  const idx = items.findIndex((i) => i.libro.id === libroId);
  if (idx >= 0) {
    items[idx].cantidad = Math.max(1, cantidad);
    writeCart(items);
  }
  return items;
}

export function clearCart() {
  writeCart([]);
}

export function getCartTotal() {
  const items = readCart();
  return items.reduce((sum, it) => sum + it.libro.precio * it.cantidad, 0);
}

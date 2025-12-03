import type {Libro} from "../types/Libros";

const API_URL = "/api/libros";

// Obtener todos los libros
export async function getLibros(): Promise<Libro[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener libros");
  return res.json();
}

// Eliminar un libro por id
export async function deleteLibro(id: number): Promise<void> {
  const token = localStorage.getItem("token"); 
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  if (!res.ok) throw new Error("Error al eliminar libro");
}

// Actualizar un libro por id
export async function updateLibro(id: number, libro: Libro): Promise<void> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(libro),
  });
  if (!res.ok) throw new Error("Error al actualizar libro");

}

// Crear un libro
export async function createLibro(libro: Partial<Libro>): Promise<Libro> {
  const token = localStorage.getItem("token");
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(libro),
  });

  if (!res.ok) throw new Error("Error al crear libro");

  return res.json();
}
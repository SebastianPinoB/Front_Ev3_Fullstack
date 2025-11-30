
// Logica de conexión con el backend
export async function loginUser(data: { correo: string; contrasenia: string }) {
  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Error en el login");
  }

  return responseData;
}

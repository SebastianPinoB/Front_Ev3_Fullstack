
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

// Enviar solicitud de recuperación: el backend debería aceptar { correo }
export async function requestPasswordReset(data: { correo: string }) {
  const response = await fetch("http://localhost:8080/auth/recuperar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(responseData.message || "Error solicitando recuperación");
  }

  return responseData;
}

// Resetear contraseña directamente (si el backend ofrece esta ruta)
export async function resetPassword(data: { correo: string; contrasenia: string }) {
  const response = await fetch("http://localhost:8080/auth/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(responseData.message || "Error reseteando la contraseña");
  }

  return responseData;
}

// Registrar usuario
export async function registerUser(data: { nombre: string; correo: string; contrasenia: string }) {
  const response = await fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(responseData.message || "Error registrando usuario");
  }

  return responseData;
}

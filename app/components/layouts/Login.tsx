import LoginForm from "../molecules/Login/formLogin";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router";
import { getUserFromToken, saveToken } from "../../utils/auth";
import { Typography, message } from "antd";


// Logica de conexión al backend
export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (values: { correo: string; contrasenia: string }) => {
    try {
      const data = await loginUser(values);
      saveToken(data.token);

      const user = getUserFromToken();

      if (!user) {
        message.error("Ocurrió un problema al procesar tu sesión. Por favor, intenta iniciar sesión de nuevo.");
        return;
      }

      // Redirigir basado en el rol
      if (user.roles.includes("ROLE_ADMIN")) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/usuario";
      }

    } catch (err: any) {
      // Mostrar mensaje más amigable para el usuario
      const serverMsg = err?.message ? ` (${err.message})` : "";
      message.error(`No se pudo iniciar sesión. Revisa tu correo y contraseña e inténtalo de nuevo.${serverMsg}`);
    }
  };

  return (
    <div className="flex h-screen">

      {/* IZQUIERDA – FORMULARIO */}
      <div className="flex items-center justify-center flex-1 bg-gray-50">
        <LoginForm onSubmit={handleLogin} />
      </div>


      {/* DERECHA – IMAGEN */}
      <div className="hidden md:block flex-1">
        <img
          src="/app/components/imgs/BibliotecaLogin2.jpg"  // Ruta
          alt="Biblioteca"
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  );
}

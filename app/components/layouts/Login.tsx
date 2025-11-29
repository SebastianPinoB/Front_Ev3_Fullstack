import LoginForm from "../molecules/Login/formLogin";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../../utils/getUserFromToken";
import { saveToken } from "../../utils/auth";


// Logica de conexión al backend
export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (values: { correo: string; password: string }) => {
    try {
      const data = await loginUser(values); // llama a la función de api
      saveToken(data.token);

      // guarda el token correctamente
      localStorage.setItem("jwt", data.token);

      // decodifica el token desde localStorage
      const user = getUserFromToken();

      if (!user) {
        alert("Error al decodificar token");
        return;
      }

      // redireccion segun rol
      if (user.roles.includes("ROLE_ADMIN")) {
        navigate("/admin");
      } else {
        navigate("/usuario");
      }

    } catch (err: any) {
      alert("Error: " + err.message);
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

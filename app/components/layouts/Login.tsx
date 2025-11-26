import LoginForm from "../molecules/Login/formLogin";
import { Flex } from "antd";
import { loginUser } from "../api/api"; 


// Logica de conexión al backend
export default function LoginPage() {
  const handleLogin = async (values: { correo: string; password: string }) => {
    try {
      const data = await loginUser(values); // llama a la función de api
      localStorage.setItem("jwt", data.token); // guarda el token
      alert("Login exitoso!");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <Flex align="center" justify="center" style={{ height: "100vh" }}>
      <LoginForm onSubmit={handleLogin} />
    </Flex>
  );
}

import LoginForm from "../molecules/Login/formLogin";
import { Flex } from "antd";

export default function LoginPage() {
  const handleLogin = (values: { correo: string; password: string }) => {
    console.log("Enviado:", values);
  };

  return (
    <Flex align="center" justify="center" style={{ height: "100vh" }}>
      <LoginForm onSubmit={handleLogin} />
    </Flex>
  );
}

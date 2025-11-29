import { Card, Form, Input, Button } from "antd";
import PrimaryButton from "../../atoms/Login/primaryButton"
import TextInput from "../../atoms/Login/textInput";
import { useNavigate } from "react-router-dom";


export default function RegisterForm() {
  const navigate = useNavigate();

  return (
    <Card
      style={{
        width: 380,
        padding: 24,
        borderRadius: 16,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
      }}
    >
      {/* BOTÓN VOLVER */}
      <Button
        type="text"
        onClick={() => navigate(-1)}
        icon={<span className="mr-1">←</span>}
        style={{
          marginBottom: 16,
          padding: "4px 8px",
          borderRadius: 6,
          fontWeight: 500,
          color: "#374151",
          backgroundColor: "transparent",
        }}
        className="hover:bg-gray-100"
      >
        Volver
      </Button>

      {/* TITULO */}
      <div className="text-center mb-8 space-y-2">
        <p className="text-3xl font-bold text-black leading-tight">
          Crear cuenta
        </p>
        <p className="text-slate-600 text-sm">
          Completa tus datos para registrarte
        </p>
      </div>

      {/* FORMULARIO */}
      <Form layout="vertical" onFinish={(values) => console.log(values)}>
        <Form.Item
          label="Nombre completo"
          name="nombre"
          rules={[{ required: true }]}
        >
          <TextInput placeholder="Ingresa tu nombre" />
        </Form.Item>

        <Form.Item
          label="Correo"
          name="correo"
          rules={[{ required: true }]}
        >
          <TextInput placeholder="Ingresa tu correo" type="email" />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="contrasenia"
          rules={[{ required: true }]}
        >
          <Input.Password placeholder="Ingresa tu contraseña" />
        </Form.Item>

        <Form.Item
          label="Confirmar contraseña"
          name="confirmar"
          rules={[{ required: true }]}
        >
          <Input.Password placeholder="Repite tu contraseña" />
        </Form.Item>

        <div className="mt-4">
          <PrimaryButton text="Registrarse" />
        </div>
      </Form>
    </Card>
  );
}

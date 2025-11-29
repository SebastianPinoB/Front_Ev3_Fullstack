import { Card, Form } from "antd";
import PrimaryButton from "../../atoms/Login/primaryButton"
import TextInput from "../../atoms/Login/textInput";
import { useNavigate } from "react-router-dom";

export default function RecoverForm() {
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
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-600 hover:text-gray-900 mb-5"
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontWeight: 600
        }}
      >
        ← Volver
      </button>

      {/* TITULOS */}
      <div className="text-center mb-8 space-y-2">
        <p className="text-3xl font-bold text-black leading-tight">
          Recuperar contraseña
        </p>
        <p className="text-slate-600 text-sm">
          Ingresa tu correo para enviarte un enlace de recuperación
        </p>
      </div>

      <Form
        layout="vertical"
        onFinish={(values) => console.log("Recuperar:", values)}
      >
        <Form.Item
          label="Correo"
          name="correo"
          rules={[{ required: true }]}
        >
          <TextInput placeholder="Ingresa tu correo" type="email" />
        </Form.Item>

        <div className="mt-4">
          <PrimaryButton text="Enviar enlace" />
        </div>
      </Form>
    </Card>
  );
}

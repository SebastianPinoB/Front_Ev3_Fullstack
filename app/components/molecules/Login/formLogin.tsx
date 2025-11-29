import { Card, Form, Input } from "antd";
import { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import PrimaryButton from "../../atoms/Login/primaryButton"
import TextInput from "../../atoms/Login/textInput";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onSubmit: (values: { correo: string; password: string }) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
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
      {/* HEADER */}
      <div className="text-center mb-8 space-y-2">
        <p className="text-3xl font-bold text-black leading-tight">
          Bienvenido de vuelta
        </p>
        <p className="text-slate-600 text-sm">
          Accede a tu biblioteca personal
        </p>
      </div>

      <Form layout="vertical" onFinish={onSubmit} className="space-y-3">

        {/* CORREO */}
        <Form.Item
          label={<span className="font-medium text-slate-700">Correo</span>}
          name="correo"
          rules={[{ required: true }]}
        >
          <TextInput placeholder="Ingresa tu correo" type="email" />
        </Form.Item>

        {/* CONTRASEÑA */}
        <Form.Item
          label={<span className="font-medium text-slate-700">Contraseña</span>}
          name="contrasenia"
          rules={[{ required: true }]}
        >
          <Input
            placeholder="Ingresa tu contraseña"
            type={showPassword ? "text" : "password"}
            size="large"
            style={{ borderRadius: 10 }}
            suffix={
              showPassword ? (
                <EyeInvisibleOutlined
                  onClick={() => setShowPassword(false)}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <EyeOutlined
                  onClick={() => setShowPassword(true)}
                  style={{ cursor: "pointer" }}
                />
              )
            }
          />
        </Form.Item>

        {/* OLVIDASTE CONTRASEÑA */}
        <div className="text-right -mt-2 mb-5 text-sm text-gray-600">
          <Link
            to="/recuperar"
            className="text-primary underline hover:text-primary/80 font-medium"
          >
            ¿Olvidaste tu contraseña?{" "}
          </Link>
        </div>


        {/* BOTÓN PRINCIPAL */}
        <div className="text-center space-y-7">
          <PrimaryButton text="Ingresar" />
          <p>
            ¿No tienes una cuenta?{" "}
            <Link to="/registro" className="text-primary underline hover:text-primary/80">
              Regístrate aquí
            </Link>
          </p>
        </div>

      </Form>
    </Card>
  );
}

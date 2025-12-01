import { Card, Form, message } from "antd";
import PrimaryButton from "../../atoms/Login/primaryButton"
import TextInput from "../../atoms/Login/textInput";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset, resetPassword } from "~/components/api/api";
import { useState } from "react";

export default function RecoverForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "reset">("email");
  const [correoConfirmado, setCorreoConfirmado] = useState<string | null>(null);

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

      {step === "email" && (
        <Form
          layout="vertical"
          onFinish={async (values) => {
            try {
              await requestPasswordReset({ correo: values.correo });
              message.success("Si el correo existe, se ha enviado un enlace de recuperación.");
              // pasar al paso de reset opcional (algunos backends no lo permiten)
              setCorreoConfirmado(values.correo);
              setStep("reset");
            } catch (err: any) {
              // Si backend responde que el correo no existe, mostrar error explícito
              message.error(err.message || "Error solicitando recuperación");
            }
          }}
        >
          <Form.Item
            label="Correo"
            name="correo"
            rules={[{ required: true, type: "email", message: 'Ingresa un correo válido' }]}
          >
            <TextInput placeholder="Ingresa tu correo" type="email" />
          </Form.Item>

          <div className="mt-4">
            <PrimaryButton text="Enviar enlace" />
          </div>
        </Form>
      )}

      {step === "reset" && (
        <Form
          layout="vertical"
          onFinish={async (values) => {
            try {
              if (!correoConfirmado) throw new Error("Correo no definido");
              if (values.password !== values.confirm) {
                message.error("Las contraseñas no coinciden");
                return;
              }
              await resetPassword({ correo: correoConfirmado, contrasenia: values.password });
              message.success("Contraseña actualizada correctamente");
              navigate("/");
            } catch (err: any) {
              message.error(err.message || "Error actualizando la contraseña");
            }
          }}
        >
          <Form.Item
            label="Nueva contraseña"
            name="password"
            rules={[{ required: true, message: 'Ingresa la nueva contraseña' }]}
          >
            <TextInput placeholder="Nueva contraseña" type="password" />
          </Form.Item>

          <Form.Item
            label="Repetir contraseña"
            name="confirm"
            rules={[{ required: true, message: 'Repite la contraseña' }]}
          >
            <TextInput placeholder="Repite la contraseña" type="password" />
          </Form.Item>

          <div className="flex gap-3 justify-end mt-4">
            <PrimaryButton text="Actualizar contraseña" />
          </div>
        </Form>
      )}
    </Card>
  );
}

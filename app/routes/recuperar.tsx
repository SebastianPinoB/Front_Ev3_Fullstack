import RecoverForm from "../components/molecules/Recover/RecoverForm";

export default function RecuperarPage() {
  return (
    <div className="flex h-screen">

      {/* IZQUIERDA – FORMULARIO */}
      <div className="flex items-center justify-center flex-1 bg-gray-50">
        <RecoverForm />
      </div>

      {/* DERECHA – IMAGEN */}
      <div className="hidden md:block flex-1">
        <img
          src="/app/components/imgs/BibliotecaLogin2.jpg"
          alt="Biblioteca"
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  );
}

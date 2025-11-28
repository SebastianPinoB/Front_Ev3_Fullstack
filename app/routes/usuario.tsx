import ProtectedRoute from "../utils/ProtectedRoute";

export default function UsuarioPage() {
   return (
      <ProtectedRoute rolesPermitidos={["ROLE_USER", "ROLE_ADMIN"]}>
         <h1>Bienvenido Usuario</h1>
      </ProtectedRoute>
   );
}

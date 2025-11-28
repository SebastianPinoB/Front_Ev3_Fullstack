import ProtectedRoute from "../utils/ProtectedRoute";

export default function AdminPage() {
   return (
      <ProtectedRoute rolesPermitidos={["ROLE_ADMIN"]}>
         <h1>Bienvenido Admin</h1>
      </ProtectedRoute>
   );
}
import ProtectedRoute from "../utils/ProtectedRoute";
import Catalogo from "~/components/organisms/user/Catalogo";
import UserLayout from "~/components/layouts/UserLayout";

export default function UsuarioPage() {
   return (
      <ProtectedRoute rolesPermitidos={["ROLE_USER"]}>
         <UserLayout>
            <Catalogo />
         </UserLayout>
      </ProtectedRoute>
   );
}

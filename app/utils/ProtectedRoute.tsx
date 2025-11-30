// app/utils/ProtectedRoute.tsx
import { Navigate } from "react-router";
import { getUserFromToken } from "./auth";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
   children,
   rolesPermitidos = [],
}: {
   children: ReactNode;
   rolesPermitidos?: string[];
}) {
   const [isClient, setIsClient] = useState(false);
   const [user, setUser] = useState(getUserFromToken());

   useEffect(() => {
      setIsClient(true);
      const decodedUser = getUserFromToken();
      setUser(decodedUser);
   }, []);

   // En el servidor, no validar aún
   if (!isClient) {
      return <>{children}</>;
   }

   if (!user) {
      return <Navigate to="/" replace />;
   }

   const tienePermiso =
      rolesPermitidos.length === 0 ||
      user.roles?.some((r: string) => rolesPermitidos.includes(r));

   if (!tienePermiso) {
      return <Navigate to="/" replace />;
   }

   return <>{children}</>;
}

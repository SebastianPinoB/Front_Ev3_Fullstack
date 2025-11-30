// app/routes/home.tsx
import { Navigate } from "react-router";
import { getUserFromToken } from "../utils/auth";

export default function Home() {
  const user = getUserFromToken();

  if (!user) return <Navigate to="/login" replace />;

  if (user.roles?.includes("ROLE_ADMIN")) return <Navigate to="/admin" replace />;
  return <Navigate to="/usuario" replace />;
}

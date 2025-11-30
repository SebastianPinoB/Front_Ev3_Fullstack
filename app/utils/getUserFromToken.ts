import { jwtDecode } from "jwt-decode";

export function getUserFromToken() {
  if (typeof window === "undefined") return null;
  
  const token = localStorage.getItem("jwt");
  if (!token) return null;

  try {
    return jwtDecode<{
      sub: string;
      roles: string[];
      exp: number;
      iat: number;
    }>(token);
  } catch (err) {
    return null;
  }
}

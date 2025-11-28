import { jwtDecode } from "jwt-decode";

export function getToken() {
   return localStorage.getItem("token");
}

export function saveToken(token: string) {
   localStorage.setItem("token", token);
}

export function getUserFromToken() {
   const token = getToken();
   if (!token) return null;

   try {
      return jwtDecode(token) as { correo: string; rol: string };
   } catch {
      return null;
   }
}
import { jwtDecode } from "jwt-decode";

export function getToken() {
   if (typeof window === "undefined") return null;
   return localStorage.getItem("token");
}

export function saveToken(token: string) {
   if (typeof window === "undefined") return;
   localStorage.removeItem("jwt");
   localStorage.setItem("token", token);
}

export function getUserFromToken() {
   const token = getToken();
   if (!token) return null;

   try {
      return jwtDecode(token) as {
         sub: string;
         roles: string[];
         exp: number;
         iat: number;
      };
   } catch {
      return null;
   }
}

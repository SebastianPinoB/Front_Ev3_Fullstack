import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),

  route("admin", "routes/admin.tsx"),
  route("usuario", "routes/usuario.tsx"),
  route("home", "routes/home.tsx"),

  route("/catalogo/:id", "routes/detalleLibro.tsx"),

  route("registro", "routes/registro.tsx"),
  route("recuperar", "routes/recuperar.tsx"),
  route("carrito", "routes/carrito.tsx"),
];

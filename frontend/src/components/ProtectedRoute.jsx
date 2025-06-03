// src/components/ui/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      correo: payload.sub,
      rol: payload.rol.replace("ROLE_", "").toLowerCase(),
      exp: payload.exp,
    };
  } catch {
    return null;
  }
};

const isTokenValid = (exp) => Date.now() < exp * 1000;

export default function ProtectedRoute({ allowedRoles }) {
  const user = getUserFromToken();

  if (!user || !isTokenValid(user.exp)) {
    return <Navigate to="/sign-in" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
}

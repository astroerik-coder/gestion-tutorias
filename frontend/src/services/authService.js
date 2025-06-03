export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user"); // si estás guardando info del usuario
  window.location.href = "/sign-in"; // redirige a la ruta del login
};

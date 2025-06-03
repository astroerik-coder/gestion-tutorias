// src/services/loginService.js
export const login = async (correo, contrasena) => {
    try {
      const response = await fetch("http://localhost:8080/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Error al iniciar sesión");
      }
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      return data.usuario;
    } catch (error) {
      throw error;
    }
  };
  